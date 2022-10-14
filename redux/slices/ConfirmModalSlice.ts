import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type IConfirmModalState = {
    message?: string;
    callback?: () => void;
};

const initialState: IConfirmModalState = {};

export const ConfirmModalSlice = createSlice({
    name: 'confirmModal',
    initialState,
    reducers: {
        confirm: (state, action: PayloadAction<IConfirmModalState>) => {
            state.message = action.payload.message;
            state.callback = action.payload.callback;
        },

        closeConfirm: (state) => {
            state.message = undefined;
            state.callback = undefined;
        },
    },
});

export const { confirm, closeConfirm } = ConfirmModalSlice.actions;
export default ConfirmModalSlice.reducer;
