import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type NotificationsListState = {
    isActive: boolean;
};

const initialState: NotificationsListState = {
    isActive: false,
};

export const NotificationsListSlice = createSlice({
    name: 'notificationsList',
    initialState,
    reducers: {
        toggleActive: (state, action: PayloadAction<boolean>) => {
            state.isActive = action.payload;
        },
    },
});

export const { toggleActive } = NotificationsListSlice.actions;
export default NotificationsListSlice.reducer;
