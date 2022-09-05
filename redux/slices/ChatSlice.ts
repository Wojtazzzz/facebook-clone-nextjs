import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { IChatFriend } from '@utils/types';

type ChatState = {
    friend: IChatSliceFriend;
    error: IError;
};

const initialState: ChatState = {
    friend: undefined,
    error: undefined,
};

export const ChatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        openChat: (state, action: PayloadAction<IChatFriend>) => {
            state.friend = action.payload;
            state.error = undefined;
        },

        closeChat: (state) => {
            state.friend = undefined;
            state.error = undefined;
        },

        setChatError: (state, action: PayloadAction<IError>) => {
            state.error = action.payload;
        },

        clearChatError: (state) => {
            state.error = undefined;
        },
    },
});

export const { openChat, closeChat, setChatError, clearChatError } = ChatSlice.actions;
export default ChatSlice.reducer;

type IError = string | undefined;
type IChatSliceFriend = IChatFriend | undefined;
