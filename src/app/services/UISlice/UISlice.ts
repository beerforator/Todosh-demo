import React from "react"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type PaneMode = 'temporary' | 'persistent'

interface ContextMenuState {
    isOpen: boolean;
    mouseX: number;
    mouseY: number;
    taskId: string
}

interface UIState {
    editingTaskId: string | null,
    detailsPaneMode: PaneMode,
    contextMenu: ContextMenuState
}

const initialState: UIState = {
    editingTaskId: null,
    detailsPaneMode: 'temporary',
    contextMenu: {
        isOpen: false,
        mouseX: 0,
        mouseY: 0,
        taskId: '',
    },
}

export const UISlice = createSlice({
    name: 'ui',
    initialState: initialState,
    reducers: {
        startEditingTask: (state, action: PayloadAction<{ taskId: string, mode: PaneMode }>) => {
            state.editingTaskId = action.payload.taskId
            state.detailsPaneMode = action.payload.mode
        },
        stopEditingTask: (state) => {
            state.editingTaskId = null
        },
        openContextMenu: (state, action: PayloadAction<{ mouseX: number, mouseY: number, taskId: string }>) => {
            state.contextMenu = {
                isOpen: true,
                mouseX: action.payload.mouseX,
                mouseY: action.payload.mouseY,
                taskId: action.payload.taskId,
            };
        },
        closeContextMenu: (state) => {
            state.contextMenu.isOpen = false;
            // state.contextMenu.taskId = null;
        },
    }
})

export const { startEditingTask, stopEditingTask, openContextMenu, closeContextMenu } = UISlice.actions

export const uiReducer = UISlice.reducer