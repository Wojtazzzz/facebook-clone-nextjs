import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { useAxios } from '@hooks/useAxios';

import { closeChat, openChat } from '@redux/slices/ChatSlice';

import type { IChatFriend } from '@utils/types';

export const useChat = () => {
    const dispatch = useAppDispatch();
    const { state, sendRequest } = useAxios();
    const friend = useAppSelector((store) => store.chat.friend);

    const handleOpenChat = (friend: IChatFriend) => {
        dispatch(openChat(friend));
    };

    const handleCloseChat = () => {
        dispatch(closeChat());
    };

    const handleSendMessage = (text: string) => {
        if (state.status === 'LOADING') return;
        if (!friend) return;

        sendRequest(
            {
                method: 'POST',
                url: '/api/messages',
                data: { text, receiver_id: friend.id },
            },
            () => alert('Something went wrong')
        );
    };

    return {
        friend,
        state,
        openChat: handleOpenChat,
        closeChat: handleCloseChat,
        sendMessage: handleSendMessage,
    };
};
