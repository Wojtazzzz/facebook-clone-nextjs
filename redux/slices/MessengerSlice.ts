import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MessengerState {
    isActive: boolean;
}

const initialState: MessengerState = {
    isActive: false,
};

export const MessengerSlice = createSlice({
    name: 'messenger',
    initialState,
    reducers: {
        toggleActive: (state, action: PayloadAction<boolean>) => {
            state.isActive = action.payload;
        },
    },
});

export const { toggleActive } = MessengerSlice.actions;
export default MessengerSlice.reducer;
