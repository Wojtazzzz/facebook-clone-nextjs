import { configureStore } from '@reduxjs/toolkit';
import ChatReducer from '@redux/slices/ChatSlice';
import AlertModalReducer from '@redux/slices/AlertModalSlice';

export const generateStore = () =>
    configureStore({
        reducer: {
            chat: ChatReducer,
            alertModal: AlertModalReducer,
        },
    });

export const store = generateStore();

export type IRootState = ReturnType<typeof store.getState>;
export type IAppDispatch = typeof store.dispatch;
