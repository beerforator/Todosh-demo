import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/app/providers/store/types';
import { Menu, MenuItem, ListItemText, Checkbox } from '@mui/material';
import { closeContextMenu, startEditingTask } from '@/app/services/UISlice/UISlice';
import { ToggleTaskContainer } from '@/features/ToggleTask/ToggleTaskContainer';

import styleCMenu from '@/app/styles/ContextMenu.module.scss'
import { DelDateIcon, EditPancilIcon, TodayTaskIcon, ToggleEmptyIcon, ToggleFullIcon, TrashIcon } from '@/shared/ui/Icons/TaskIcon';
import { DeleteTaskContainer } from '@/features/DeleteTask/DeleteTaskContainer';
import { ToggleFavouriteContainer } from '@/features/ToggleFavourite/ToggleFavouriteContainer';
import { ToggleFavourite } from '@/shared/ui/TaskManipulationIcons/ToggleFavourite';
import { SetTaskTodayPaneContainer } from '@/features/SetTaskToday/SetTaskTodayPaneContainer';
import { RemoveTaskDatePaneContainer } from '@/features/RemoveTaskDate/RemoveTaskDatePaneContainer';
import { MemoizedListSelect } from '../TaskDetailsPane/ui/TaskDetailPaneSections';

export const TaskContextMenu = () => {
    const dispatch = useDispatch();
    const { isOpen, mouseX, mouseY, taskId } = useSelector((state: RootState) => state.uiReducer.contextMenu);

    const handleClose = () => {
        dispatch(closeContextMenu());
    };

    const handleEdit = () => {
        if (taskId) dispatch(startEditingTask({ taskId, mode: 'persistent' }));
        handleClose();
    };

    const handleBackdropContextMenu = (e: React.MouseEvent) => {
        e.preventDefault()
        handleClose()
    }

    return (
        <Menu
            open={isOpen}
            onClose={handleClose}
            anchorReference="anchorPosition"
            anchorPosition={
                isOpen ? { top: mouseY, left: mouseX } : undefined
            }
            onBlur={handleClose}
            slotProps={{
                backdrop: {
                    onContextMenu: handleBackdropContextMenu
                }
            }}

            className={styleCMenu.menuStyle}
        >
            <div className={styleCMenu.menu_container + ' paperBlock'}>
                <MenuItem className={styleCMenu.menuItem} onClick={handleEdit}>
                    <EditPancilIcon />
                    <ListItemText>Edit</ListItemText>
                </MenuItem>

                <ToggleTaskContainer
                    taskId={taskId}
                    render={({ onClick, isLoading, isCompleted }) => (
                        <MenuItem className={styleCMenu.menuItem} onClick={onClick} disabled={isLoading}>
                            <Checkbox
                                icon={<ToggleEmptyIcon />}
                                checkedIcon={<ToggleFullIcon />}
                                checked={isCompleted}
                                disabled={isLoading}
                            />
                            <ListItemText>Toggle</ListItemText>
                        </MenuItem>
                    )}
                />

                <ToggleFavouriteContainer
                    taskId={taskId}
                    render={({ onClick, isLoading, isFavourite }) => (
                        <MenuItem className={styleCMenu.menuItem} onClick={onClick} disabled={isLoading}>
                            <ToggleFavourite
                                isFavourite={isFavourite}
                                isSettingToggle={isLoading}
                            />
                            <ListItemText>Set favourite</ListItemText>
                        </MenuItem>
                    )}
                />

                <SetTaskTodayPaneContainer
                    taskId={taskId}
                    render={({ onClick, isLoading }) => (
                        <MenuItem className={styleCMenu.menuItem} onClick={onClick} disabled={isLoading}>
                            <TodayTaskIcon />
                            <ListItemText>Set task today</ListItemText>
                        </MenuItem>
                    )}
                />

                <RemoveTaskDatePaneContainer
                    taskId={taskId}
                    render={({ onClick, isLoading }) => (
                        <MenuItem className={styleCMenu.menuItem} onClick={onClick} disabled={isLoading}>
                            <DelDateIcon />
                            <ListItemText>Delete date</ListItemText>
                        </MenuItem>
                    )}
                />

                {/* <div className={styleP.paneBase}> */}
                    {/* <MemoizedListSelect
                        value={selectedListId}
                        onChange={handleListChange}
                        disabled={isSettingFetchTasks}
                        lists={allLists}
                    /> */}
                {/* </div> */}

                <DeleteTaskContainer
                    taskId={taskId}
                    render={({ onClick, isLoading }) => (
                        <MenuItem className={styleCMenu.menuItem} onClick={onClick} disabled={isLoading} sx={{ color: 'error.main' }}>
                            <TrashIcon />
                            <ListItemText>Delete</ListItemText>
                        </MenuItem>
                    )}
                />
            </div>
        </Menu>
    );
};