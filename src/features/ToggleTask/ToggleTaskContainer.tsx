import React from 'react';
import { useSelector } from 'react-redux';
import { useCallback } from 'react';

import { updateTaskApi } from '../../app/services/taskServices/updateTaskApi';
import { useApiRequest } from '@/shared/hooks/useApiRequest';
import { tasksSelectors } from '@/app/providers/store/slices/tasksSlice';
import { RootState } from '@/app/providers/store/types';
import { ToggleTask } from '@/shared/ui/TaskManipulationIcons/ToggleTask';

interface ToggleTaskContainerProps {
    taskId: string,
    size?: 'small' | 'medium',
    render?: (props: { onClick: (e: React.ChangeEvent) => void, isLoading: boolean, isCompleted: boolean }) => React.ReactNode;
}

export const ToggleTaskContainer = React.memo(({ taskId, size = 'medium', render }: ToggleTaskContainerProps) => {
    const [letToggle, isLettingToggle] = useApiRequest(updateTaskApi, {})

    const isCompleted = useSelector((state: RootState) =>
        tasksSelectors.selectById(state, taskId)?.isCompleted
    );

    const handleToggle = useCallback((e: React.ChangeEvent) => {
        e.stopPropagation()

        let payload = {
            taskId: taskId,
            changes: { isCompleted: !isCompleted }
        }

        letToggle(payload)
    }, [isCompleted, taskId, letToggle])

    if (render) {
        return render({ onClick: handleToggle, isLoading: isLettingToggle, isCompleted: isCompleted });
    }

    return (
        <ToggleTask
            size={size}
            isCompleted={isCompleted}
            isLettingToggle={isLettingToggle}
            handleToggle={handleToggle}
        />
    );
});

