import { configureStore } from '@reduxjs/toolkit';

import NavReducer from '@redux/slices/NavSlice';
import SidebarReducer from '@redux/slices/SidebarSlice';
import ChatReducer from '@redux/slices/ChatSlice';
import MessengerReducer from '@redux/slices/MessengerSlice';
import NotificationsReducer from '@redux/slices/NotificationsSlice';
import CreatePostModalReducer from '@redux/slices/CreatePostModalSlice';
import AlertModalReducer from '@redux/slices/AlertModalSlice';

export const generateStore = () =>
    configureStore({
        reducer: {
            nav: NavReducer,
            sidebar: SidebarReducer,
            chat: ChatReducer,
            messenger: MessengerReducer,
            notifications: NotificationsReducer,
            createPostModal: CreatePostModalReducer,
            alertModal: AlertModalReducer,
        },
    });

export const store = generateStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
