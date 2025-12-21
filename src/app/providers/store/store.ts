import { configureStore } from '@reduxjs/toolkit';
import { listsReducer } from '@/app/providers/store/slices/listsSlice';
import { uiReducer } from '@/app/services/UISlice/UISlice';
import { tasksReducer } from './slices/tasksSlice';
import { settingsReducer } from './slices/settingsSlice';

export const store = configureStore({
    reducer: {
        tasks: tasksReducer,
        lists: listsReducer,
        uiReducer: uiReducer,
        settings: settingsReducer
    },
});