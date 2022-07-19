import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { IChatFriend, IContact, IUser } from '@utils/types';

interface ChatState {
    friend: IChatFriend | undefined;
}

const initialState: ChatState = {
    friend: undefined,
};

export const ChatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        openChat: (state, action: PayloadAction<IUser | IContact | IChatFriend>) => {
            state.friend = action.payload;
        },
        closeChat: (state) => {
            state.friend = undefined;
        },
    },
});

export const { openChat, closeChat } = ChatSlice.actions;
export default ChatSlice.reducer;
