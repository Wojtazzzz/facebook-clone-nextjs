import { useAppDispatch, useAppSelector } from '@hooks/redux';

import { closeChat, openChat } from '@redux/slices/ChatSlice';
import { axios } from '@libs/axios';

import type { IChatFriend } from '@utils/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useChat = () => {
    const dispatch = useAppDispatch();
    const friend = useAppSelector((store) => store.chat.friend);
    const queryClient = useQueryClient();

    const sendMessageMutation = useMutation((data: { text: string; receiver_id: number }) =>
        axios.post('/api/messages', { data })
    );

    const handleOpenChat = (friend: IChatFriend) => {
        dispatch(openChat(friend));
    };

    const handleCloseChat = () => {
        dispatch(closeChat());
    };

    const handleSendMessage = (text: string) => {
        if (!friend) return;
        if (sendMessageMutation.isLoading) return;

        sendMessageMutation.mutate({
            text,
            receiver_id: friend.id,
        });

        // Chat component is listening for new messages, so mutation is needless
    };

    const invalidate = () => {
        queryClient.invalidateQueries(['chat']);
    };

    return {
        invalidate,
        openChat: handleOpenChat,
        closeChat: handleCloseChat,
        sendMessage: handleSendMessage,
    };
};
