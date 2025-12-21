import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg, EventResizeDoneArg } from '@fullcalendar/interaction';
import { AppDispatch, RootState } from '@/app/providers/store/types';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo, useRef, useState } from 'react';
import { fetchTasksApi } from '@/app/services/taskServices/fetchTasksApi';
import { EventClickArg, EventDropArg, EventMountArg } from '@fullcalendar/core';
import { updateTaskApi } from '@/app/services/taskServices/updateTaskApi';
import { CalendarCreateModal } from '@/features/CreateTask/TaskModal/CalendarCreateModal';
import { openContextMenu, startEditingTask } from '@/app/services/UISlice/UISlice';
import { listsSelectors } from '@/app/providers/store/slices/listsSlice';
import timeGridPlugin from '@fullcalendar/timegrid';
import { ListItemIcon, Typography } from '@mui/material';
import { tasksSelectors } from '@/app/providers/store/slices/tasksSlice';
import { useApiRequest } from '@/shared/hooks/useApiRequest';

import { CalendarPageIcon } from '@/shared/ui/Icons/SidebarIcons';
import { TaskCardCalendarProvider } from '@/entities/Task/TaskCardCalendarProvider';
import { SMART_LIST_IDS } from '@/shared/config/smartLists';

import style from '@/app/styles/IconStyles.module.scss'
import styleMC from '@/app/styles/MainContentStyles/MainContent.module.scss'

export const CalendarPage = () => {
    const dispatch: AppDispatch = useDispatch()
    const allLists = useSelector(listsSelectors.selectAll)
    const allTasks = useSelector(tasksSelectors.selectAll)
    const tasksLoadingStatus = useSelector((state: RootState) => state.tasks.loading)
    const selectedListId = useSelector((state: RootState) => state.lists.selectedListId);

    const calendarRef = useRef<FullCalendar>(null);

    const [setFetchTasks, isSettingFetchTasks] = useApiRequest(fetchTasksApi, {})
    const [setUpdateDates, isSettingUpdateDates] = useApiRequest(updateTaskApi, {})

    // Управление календарем

    useEffect(() => {
        const calendarApi = calendarRef.current?.getApi();
        if (!calendarApi) return;

        if (selectedListId === SMART_LIST_IDS.TODAY) {
            calendarApi.gotoDate(new Date());
        } else {
            calendarApi.changeView('dayGridMonth')
        }
    }, [selectedListId]);

    useEffect(() => {
        if (tasksLoadingStatus === 'idle') {
            setFetchTasks({})
        }
    }, [setFetchTasks, tasksLoadingStatus])

    const calendarEvents = useMemo(() => {
        const filteredTasks = selectedListId === SMART_LIST_IDS.ALL || selectedListId === SMART_LIST_IDS.TODAY
            ? allTasks
            : allTasks.filter(task => task.listOwnerId === selectedListId);

        return filteredTasks
            .filter(task => !!task.startDate)
            .map(task => {

                return {
                    id: task.id,
                    title: task.title,
                    start: task.startDate ?? undefined,
                    end: task.endDate ?? undefined,
                    extendedProps: {
                        task,
                    },
                    allDay: true
                }
            })
    }, [allTasks, selectedListId, allLists])

    const handleEventDrop = (dropInfo: EventDropArg) => {
        const { event } = dropInfo

        const payload = {
            taskId: event.id,
            changes: {
                startDate: event.start ?? undefined,
                endDate: event.end ?? undefined
            }
        }

        setUpdateDates(payload)
    }

    // Создание задач

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const handleDateClick = (clickInfo: DateClickArg) => {
        setSelectedDate(clickInfo.date);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedDate(null);
    };

    // Изменение задач

    const handleEditingTask = (clickInfo: EventClickArg) => {
        const taskId = clickInfo.event.id;
        dispatch(startEditingTask({
            taskId: taskId,
            mode: 'temporary'
        }))
    }

    // Растягивание задачи

    const handleEventResize = (resizeInfo: EventResizeDoneArg) => {
        const { event } = resizeInfo

        const payload = {
            taskId: event.id,
            changes: {
                startDate: event.start,
                endDate: event.end
            }
        }

        setUpdateDates(payload)
    }

    const handleEventDidMount = (arg: EventMountArg) => {
        arg.el.addEventListener('contextmenu', (e: MouseEvent) => {
            e.preventDefault(); 
            e.stopPropagation();

            dispatch(openContextMenu({
                mouseX: e.clientX,
                mouseY: e.clientY,
                taskId: arg.event.id,
            }));
        });
    };

    return (
        <>
            <div className={styleMC.listHeader}>
                <ListItemIcon>
                    <CalendarPageIcon className={style.filterIconStyle + ' ' + style.allIconStyle} />
                </ListItemIcon>
                <Typography variant="h4" gutterBottom>Calendar</Typography>
            </ div>
            <div className={styleMC.scrollableView + ' ' + styleMC.scrollableView_calendar}>
                <FullCalendar
                    // Визуал
                    headerToolbar={{
                        start: "prev next",
                        end: "dayGridMonth dayGridWeek",
                    }}
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView='dayGridMonth'
                    firstDay={1}
                    height="85vh"

                    // Флаги для управления
                    editable={true}
                    weekends={true}
                    events={calendarEvents}
                    eventResizableFromStart={true}

                    // Калбэки
                    eventDrop={handleEventDrop}
                    dateClick={handleDateClick}
                    eventClick={handleEditingTask}
                    eventResize={handleEventResize}

                    // Кастомный контент
                    ref={calendarRef}
                    eventContent={TaskCardCalendarProvider}

                    eventDidMount={handleEventDidMount}
                />
                {isModalOpen && (
                    <CalendarCreateModal
                        onClose={handleCloseModal}
                        selectedDate={selectedDate}
                    />
                )}
            </div>
        </>
    )
}