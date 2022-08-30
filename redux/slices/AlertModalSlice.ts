import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type IAlertModalState = {
    message?: string;
};

const initialState: IAlertModalState = {};

export const AlertModalSlice = createSlice({
    name: 'alertModal',
    initialState,
    reducers: {
        alert: (state, action: PayloadAction<IAlertModalState>) => {
            state.message = action.payload.message;
        },

        closeAlert: (state) => {
            state.message = undefined;
        },
    },
});

export const { alert, closeAlert } = AlertModalSlice.actions;
export default AlertModalSlice.reducer;
