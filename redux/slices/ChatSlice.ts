import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { UserType } from '@ctypes/features/UserType';

interface ChatState {
	friend?: UserType;
}

const initialState: ChatState = {
	friend: undefined,
};

export const ChatSlice = createSlice({
	name: 'chat',
	initialState,
	reducers: {
		toggleActive: (state, action: PayloadAction<UserType | undefined>) => {
			state.friend = action.payload;
		},
	},
});

export const { toggleActive } = ChatSlice.actions;
export default ChatSlice.reducer;
