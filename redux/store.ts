import { configureStore } from '@reduxjs/toolkit';

import NavReducer from '@redux/slices/NavSlice';
import SidebarReducer from '@redux/slices/SidebarSlice';
import ChatReducer from '@redux/slices/ChatSlice';
import MessengerReducer from '@redux/slices/MessengerSlice';
import NotificationsListReducer from '@redux/slices/NotificationsListSlice';

export const store = configureStore({
	reducer: {
		nav: NavReducer,
		sidebar: SidebarReducer,
		chat: ChatReducer,
		messenger: MessengerReducer,
		notificationsList: NotificationsListReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
