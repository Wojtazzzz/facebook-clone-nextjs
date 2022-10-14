import { configureStore } from '@reduxjs/toolkit';
import ChatReducer from '@redux/slices/ChatSlice';
import AlertModalReducer from '@redux/slices/AlertModalSlice';
import ConfirmModalReducer from '@redux/slices/ConfirmModalSlice';

export const generateStore = () =>
    configureStore({
        reducer: {
            chat: ChatReducer,
            alertModal: AlertModalReducer,
            confirmModal: ConfirmModalReducer,
        },
    });

export const store = generateStore();

export type IRootState = ReturnType<typeof store.getState>;
export type IAppDispatch = typeof store.dispatch;
