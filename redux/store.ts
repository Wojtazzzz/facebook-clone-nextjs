import { configureStore } from '@reduxjs/toolkit';

import NavReducer from '@redux/slices/NavSlice';
import SidebarReducer from '@redux/slices/SidebarSlice';


export const store = configureStore({
    reducer: {
        nav: NavReducer,
        sidebar: SidebarReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;