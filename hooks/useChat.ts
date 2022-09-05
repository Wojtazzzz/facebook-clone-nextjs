import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { clearChatError, closeChat, openChat, setChatError } from '@redux/slices/ChatSlice';
import type { IChatFriend } from '@utils/types';
import { useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

export const useChat = () => {
    const dispatch = useAppDispatch();
    const { friend, error } = useAppSelector((store) => store.chat);
    const queryClient = useQueryClient();

    const handleOpenChat = (friend: IChatFriend) => {
        dispatch(openChat(friend));
    };

    const handleCloseChat = () => {
        dispatch(closeChat());
    };

    const revalidateMessages = () => {
        if (!friend) return;

        queryClient.invalidateQueries(['chat', friend.id]);
    };

    const setError = (error: AxiosError) => {
        dispatch(setChatError(error.response?.statusText ?? 'Something went wrong'));
    };

    const clearError = () => {
        if (!error) return;

        dispatch(clearChatError());
    };

    return {
        friend,
        error,
        revalidateMessages,
        setError,
        clearError,
        openChat: handleOpenChat,
        closeChat: handleCloseChat,
    };
};
