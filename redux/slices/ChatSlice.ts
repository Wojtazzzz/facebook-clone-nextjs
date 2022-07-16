import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { IUser } from '@utils/types';

interface ChatState {
    friend: IUser | undefined;
}

const initialState: ChatState = {
    friend: undefined,
};

export const ChatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        showChat: (state, action: PayloadAction<IUser | undefined>) => {
            state.friend = action.payload;
        },
        closeChat: (state) => {
            state.friend = undefined;
        },
    },
});

export const { showChat, closeChat } = ChatSlice.actions;
export default ChatSlice.reducer;
