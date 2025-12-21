import React, { useCallback, useState } from 'react';

import { Box, Button, Modal, Typography, IconButton } from '@mui/material';
import { TAG_COLORS } from '@/shared/config/colors';
import { createListApi } from '@/app/services/listServices/createListApi';
import { useApiRequest } from '@/shared/hooks/useApiRequest';
import { MemoizedTextField } from '@/shared/ui/MemoizedTextField';

import styleMS from '@/app/styles/ModalStyles.module.scss'

interface CreateListModalProps {
    onClose: () => void;
}

export const CreateListModal = ({ onClose }: CreateListModalProps) => {
    const [letSubmit, isLettingSubmit] = useApiRequest(createListApi, {
        onFinally: () => {
            onClose()
        }
    })
    const [newListName, setNewListName] = useState('');
    const [newListColor, setNewListColor] = useState(TAG_COLORS[0]);

    const handleNewListName = useCallback((e: any) => {
        setNewListName(e.target.value)
    }, [setNewListName])

    const handleSubmit = () => {
        if (!newListName.trim()) return;

        let payload = {
            name: newListName,
            color: newListColor
        }

        letSubmit(payload)
    }

    return (
        <Modal open={true} onClose={onClose}>
            <div className={styleMS.modalContainer + ' paperBlock'}>
                <Typography variant="h6">New list name</Typography>
                <MemoizedTextField
                    label="Название списка"
                    value={newListName}
                    onChange={handleNewListName}
                    disabled={isLettingSubmit}
                />
                <Box sx={{ display: 'flex', flexWrap: 'wrap',gap: 1, my: 2 }}>
                    {TAG_COLORS.map(color => (
                        <IconButton
                            key={color}
                            onClick={() => setNewListColor(color)}
                            sx={{
                                width: 32,
                                height: 32,
                                backgroundColor: color,
                                border: newListColor === color ? '2px solid #000' : '2px solid transparent',
                            }}
                        />
                    ))}
                </Box>
                <Button onClick={handleSubmit} variant="contained" disabled={isLettingSubmit} className={styleMS.modalContainer_button}>
                    {isLettingSubmit ? 'Creating...' : 'Create'}
                </Button>
            </div>
        </Modal>
    );
};