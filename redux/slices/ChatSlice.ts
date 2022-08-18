import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { IChatFriend, IContact, IUser } from '@utils/types';

type ChatState = {
    friend: IFriend;
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
        openChat: (state, action: PayloadAction<IPayloadFriend>) => {
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
    },
});

export const { openChat, closeChat, setChatError } = ChatSlice.actions;
export default ChatSlice.reducer;

type IPayloadFriend = IUser | IContact | IChatFriend;
type IFriend = IPayloadFriend | undefined;
type IError = string | undefined;
