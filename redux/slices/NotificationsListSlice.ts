import { createSlice } from '@reduxjs/toolkit';

interface NotificationsListState {
	isActive: boolean;
}

const initialState: NotificationsListState = {
	isActive: false,
};

export const NotificationsListSlice = createSlice({
	name: 'notificationsList',
	initialState,
	reducers: {
		toggleActive: state => {
			state.isActive = !state.isActive;
		},
	},
});

export const { toggleActive } = NotificationsListSlice.actions;
export default NotificationsListSlice.reducer;
