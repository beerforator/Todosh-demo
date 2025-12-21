import React from 'react';

import { Task } from '@/shared/types/entities';
import { TaskText } from './ui/TaskCard';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/providers/store/types';
import { listsSelectors } from '@/app/providers/store/slices/listsSlice';
import { CircleCalendar } from '@/shared/ui/ListCircleIcon';
import { IconButton } from '@mui/material';
import { StarEmptyIcon, StarFullIcon } from '@/shared/ui/Icons/TaskIcon';

import styleC from '@/app/styles/MainContentStyles/CalendarPage.module.scss'
import { openContextMenu } from '@/app/services/UISlice/UISlice';

interface TaskCardCalendarContainerProps {
    task: Task,
    isSettingUpdateDates?: boolean,
    isMini: boolean
}

export const TaskCardCalendarContainer = React.memo(({ task, isSettingUpdateDates, isMini }: TaskCardCalendarContainerProps) => {
    const dispatch: AppDispatch = useDispatch();

    const handleContextMenu = (e: React.MouseEvent) => {
        e.preventDefault();
        dispatch(openContextMenu({
            mouseX: e.clientX - 2,
            mouseY: e.clientY - 4,
            taskId: task.id,
        }));
    };

    const selectedList = useSelector((state: RootState) => listsSelectors.selectById(state, task.listOwnerId));

    if (isMini)
        return (
            <CircleCalendar
                color={selectedList
                    ? selectedList.color
                    : "#000"}
                isFull={task.isCompleted}
                onContextMenu={handleContextMenu}
            />
        )

    return (
        <div className={styleC.calendarEvent} onContextMenu={handleContextMenu}>
            <div className={styleC.calendarEvent_inner}>
                <CircleCalendar
                    color={selectedList
                        ? selectedList.color
                        : "#000"}
                    isFull={task.isCompleted}
                />
                <TaskText
                    text={task.title}
                    isCompleted={task.isCompleted}
                    type='title'
                />
            </div>

            <IconButton
                size='small'
                onMouseDown={(e) => e.stopPropagation()}
                disabled
            >
                {task.isFavourite
                    ? <StarFullIcon />
                    : <StarEmptyIcon />}
            </IconButton>
        </div>
    )
})