import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/providers/store/types';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { createTaskApi } from '../../../app/services/taskServices/createTaskApi';
import { useApiRequest } from '@/shared/hooks/useApiRequest';
import { MemoizedTextField } from '@/shared/ui/MemoizedTextField';

import styleMS from '@/app/styles/ModalStyles.module.scss'

interface CalendarCreateModalProps {
    onClose: () => void,
    selectedDate: Date | null
}

export const CalendarCreateModal = ({ onClose, selectedDate }: CalendarCreateModalProps) => {
    const [title, setTitle] = useState('');
    const selectedListId = useSelector((state: RootState) => state.lists.selectedListId);

    const [letSubmit, isLettingSubmit] = useApiRequest(createTaskApi, {
        onFinally: () => {
            onClose()
        }
    })

    const handleSubmit = () => {
        if (!title.trim() || !selectedDate) return;

        let listOwnerId = (selectedListId === 'all' || selectedListId === 'today') ? '' : selectedListId
        
        let payload = {
            title: title,
            listOwnerId: listOwnerId,
            startDate: selectedDate,
            endDate: selectedDate
        }

        letSubmit(payload)
    }

    return (
        <Modal open={true} onClose={onClose}>
            <div className={styleMS.modalContainer + ' paperBlock'}>
                <Typography variant="h6" component="h2">
                    New task title
                </Typography>
                <MemoizedTextField
                    label="Название задачи"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    disabled={isLettingSubmit}
                />
                <Button onClick={handleSubmit} variant="contained" disabled={isLettingSubmit} className={styleMS.modalContainer_button}>
                    {isLettingSubmit ? 'Creating...' : 'Create'}
                </Button>
            </div>
        </Modal>
    );
};