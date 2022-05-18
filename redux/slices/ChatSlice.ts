import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { UserType } from '@ctypes/features/UserType';

interface ChatState {
    friend: UserType | undefined;
}

const initialState: ChatState = {
    friend: undefined,
};

export const ChatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        showChat: (state, action: PayloadAction<UserType | undefined>) => {
            state.friend = action.payload;
        },
        closeChat: (state) => {
            state.friend = undefined;
        },
    },
});

export const { showChat, closeChat } = ChatSlice.actions;
export default ChatSlice.reducer;
