import React from 'react';

import { deleteTaskApi } from '@/app/services/taskServices/deleteTaskApi';
import { useApiRequest } from '@/shared/hooks/useApiRequest';
import { DeleteTask } from '@/shared/ui/TaskManipulationIcons/DeleteTask';

interface DeleteTaskContainerProps {
    taskId: string,
    render?: (props: { onClick: () => void, isLoading: boolean }) => React.ReactNode;
}

export const DeleteTaskContainer = React.memo(({ taskId, render }: DeleteTaskContainerProps) => {
    const [letDelete, isLettingDelete] = useApiRequest(deleteTaskApi, {})

    const handleDelete = () => {
        if (!window.confirm('Вы уверены, что хотите удалить эту задачу?')) {
            return;
        }

        let payload = taskId

        letDelete(payload)
    }

    if (render) {
        return render({ onClick: handleDelete, isLoading: isLettingDelete });
    }

    return (
        <DeleteTask
            handleDelete={handleDelete}
            isLettingDelete={isLettingDelete}
        />
    );
})