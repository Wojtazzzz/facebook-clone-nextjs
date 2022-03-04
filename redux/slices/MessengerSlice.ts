import { createSlice } from '@reduxjs/toolkit';

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
		toggleActive: state => {
			state.isActive = !state.isActive;
		},
	},
});

export const { toggleActive } = MessengerSlice.actions;
export default MessengerSlice.reducer;
