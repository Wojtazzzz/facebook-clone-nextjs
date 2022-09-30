import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { clearChatError, closeChat, openChat, setChatError } from '@redux/slices/ChatSlice';
import type { IChatFriend } from '@utils/types';
import { useQueryClient } from '@tanstack/react-query';
import { getErrorMessage } from '@utils/getErrorMessage/getErrorMessage';
import { getChatQK } from '@utils/queryKeys';

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

        if (!queryClient.isFetching(getChatQK(friend.id))) {
            queryClient.invalidateQueries(getChatQK(friend.id));
        }
    };

    const setError = (error: unknown) => {
        const message = getErrorMessage(error);

        dispatch(setChatError(message));
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
