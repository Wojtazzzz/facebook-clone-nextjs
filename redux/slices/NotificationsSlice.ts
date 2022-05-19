import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';

type NotificationsState = {
    isActive: boolean;
};

const initialState: NotificationsState = {
    isActive: false,
};

export const NotificationsSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        toggleActive: (state, action: PayloadAction<boolean>) => {
            state.isActive = action.payload;
        },
    },
});

export const { toggleActive } = NotificationsSlice.actions;
export default NotificationsSlice.reducer;
