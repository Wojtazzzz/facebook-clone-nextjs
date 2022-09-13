import { configureStore } from '@reduxjs/toolkit';
import ChatReducer from '@redux/slices/ChatSlice';
import CreatePostModalReducer from '@redux/slices/CreatePostModalSlice';
import UpdatePostModalReducer from '@redux/slices/UpdatePostModalSlice';
import AlertModalReducer from '@redux/slices/AlertModalSlice';

export const generateStore = () =>
    configureStore({
        reducer: {
            chat: ChatReducer,
            createPostModal: CreatePostModalReducer,
            updatePostModal: UpdatePostModalReducer,
            alertModal: AlertModalReducer,
        },
    });

export const store = generateStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
