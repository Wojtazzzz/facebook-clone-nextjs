import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { usePaginatedData } from '@hooks/usePaginatedData';

import { closeChat, openChat } from '@redux/slices/ChatSlice';
import { axios } from '@libs/axios';

import type { IChatFriend, IChatMessage } from '@utils/types';

export const useChat = () => {
    const dispatch = useAppDispatch();
    const friend = useAppSelector((store) => store.chat.friend);

    const { data, isEmpty, isError, isReachedEnd, loadMore, refresh } = usePaginatedData<IChatMessage>(
        (index) => (friend?.id ? `/api/messages/${friend.id}?page=${index + 1}` : null),
        15
    );

    const handleOpenChat = (friend: IChatFriend) => {
        dispatch(openChat(friend));
    };

    const handleCloseChat = () => {
        dispatch(closeChat());
    };

    const handleSendMessage = (text: string) => {
        if (!friend) return;

        axios.post('/api/messages', { text, receiver_id: friend.id });

        // Chat component is listening for new messages, so mutation is needless
        // mutate();
    };

    return {
        messages: data,
        isReachedEnd,
        isEmpty,
        isLoading: false,
        isError,
        loadMore,
        refresh,
        openChat: handleOpenChat,
        closeChat: handleCloseChat,
        sendMessage: handleSendMessage,
    };
};
