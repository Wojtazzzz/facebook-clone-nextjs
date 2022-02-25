import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { UserType } from '@ctypes/features/UserType';

interface ChatState {
	isActive: boolean;
	friend?: UserType;
}

const initialState: ChatState = {
	isActive: false,
	friend: undefined,
};

export const ChatSlice = createSlice({
	name: 'chat',
	initialState,
	reducers: {
		toggleActive: (state, action: PayloadAction<ChatState>) => {
			(state.isActive = action.payload.isActive), (state.friend = action.payload.friend);
		},
	},
});

export const { toggleActive } = ChatSlice.actions;
export default ChatSlice.reducer;
