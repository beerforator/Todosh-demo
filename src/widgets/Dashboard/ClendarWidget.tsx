import { listsSelectors } from '@/app/providers/store/slices/listsSlice'
import { tasksSelectors } from '@/app/providers/store/slices/tasksSlice'
import { RootState } from '@/app/providers/store/types'
import { fetchTasksApi } from '@/app/services/taskServices/fetchTasksApi'
import { TaskCardMiniCalendarProvider } from '@/entities/Task/TaskCardCalendarProvider'
import { SMART_LIST_IDS } from '@/shared/config/smartLists'
import { useApiRequest } from '@/shared/hooks/useApiRequest'
import FullCalendar from '@fullcalendar/react'
import { useEffect, useMemo, useRef } from 'react'
import { useSelector } from 'react-redux'
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

import styleMC from '@/app/styles/MainContentStyles/MainContent.module.scss'
import styleD from '@/app/styles/MainContentStyles/DashboardPage.module.scss'

export const ClendarWidget = () => {
    const allLists = useSelector(listsSelectors.selectAll)
    const allTasks = useSelector(tasksSelectors.selectAll)
    const tasksLoadingStatus = useSelector((state: RootState) => state.tasks.loading)
    const selectedListId = useSelector((state: RootState) => state.lists.selectedListId);

    const calendarRef = useRef<FullCalendar>(null);

    const [setFetchTasks, isSettingFetchTasks] = useApiRequest(fetchTasksApi, {})

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
                        task
                    },
                    allDay: true
                }
            })
    }, [allTasks, selectedListId, allLists])

    return (
        <>
            <div className={styleD.calendarWidget_inner + ' ' + styleMC.scrollableView + ' ' + styleMC.scrollableView_calendar + ' ' + styleMC.scrollableView_miniCalendar}>
                <FullCalendar
                    // Визуал
                    headerToolbar={{
                        start: "",
                        end: "",
                    }}
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView='dayGridMonth'
                    firstDay={1}
                    height="100%"
                    eventDisplay="list-item"
                    dayMaxEvents={false}

                    // Флаги для управления
                    weekends={true}
                    events={calendarEvents}

                    // Кастомный контент
                    ref={calendarRef}
                    eventContent={TaskCardMiniCalendarProvider}
                />
            </div>
        </>
    )
}