import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { closeChat, openChat, setChatError } from '@redux/slices/ChatSlice';
import { axios } from '@libs/axios';
import type { IChatFriend, IChatMessage, IPaginatedResponse } from '@utils/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { UseMutationResult } from '@tanstack/react-query';
import type { InfiniteData } from '@tanstack/react-query';
import { v4 as uuid } from 'uuid';
import type { AxiosError, AxiosResponse } from 'axios';

export const useChat = () => {
    const dispatch = useAppDispatch();
    const friend = useAppSelector((store) => store.chat.friend);
    const queryClient = useQueryClient();
    const error = useAppSelector((store) => store.chat.error);

    const mutation: IMutation = useMutation(mutationFn, {
        onMutate: async ({ content }) => {
            if (!friend) return;

            const message = createMessage(content);

            const previousMessages = queryClient.getQueryData(['chat', friend.id]);
            await queryClient.cancelQueries(['chat', friend.id]);

            queryClient.setQueryData<IQueryData>(['chat', friend.id], (data) => {
                if (!data) return;

                const pages = data.pages.map((page) => ({
                    ...page,
                    data: [message, ...page.data],
                }));

                return {
                    ...data,
                    pages,
                };
            });

            return { previousMessages };
        },

        onSuccess() {
            if (!error) return;

            dispatch(setChatError(undefined));
        },

        onError: (err, newTodo, context) => {
            if (!friend || !context) return;

            dispatch(setChatError(err.response?.statusText ?? 'Something went wrong'));

            queryClient.setQueryData(['chat', friend.id], context.previousMessages);
        },

        onSettled: () => {
            if (!friend) return;

            queryClient.invalidateQueries(['chat', friend.id]);
        },
    });

    const handleOpenChat = (friend: IChatFriend) => {
        dispatch(openChat(friend));
    };

    const handleCloseChat = () => {
        dispatch(closeChat());
    };

    const handleSendMessage = (content: string) => {
        if (!friend) return;

        // @todo remove it, setup backend throttling
        if (mutation.isLoading) return;

        mutation.mutate({
            content,
            receiver_id: friend.id,
        });

        // Chat component is listening for new messages, so invalidate is needless
    };

    const invalidate = () => {
        if (!friend) return;

        queryClient.invalidateQueries(['chat', friend.id]);
    };

    return {
        invalidate,
        openChat: handleOpenChat,
        closeChat: handleCloseChat,
        sendMessage: handleSendMessage,
    };
};

type IMutation = UseMutationResult<
    AxiosResponse<any, any>,
    AxiosError<any, any>,
    {
        content: string;
        receiver_id: number;
    },
    {
        previousMessages: unknown;
    }
>;
type IQueryData = InfiniteData<IPaginatedResponse<IChatMessage>>;

const mutationFn = (data: { content: string; receiver_id: number }) => axios.post('/api/messages', data);
const createMessage = (content: string): IChatMessage => {
    return {
        id: uuid(),
        content,
        is_received: false,
        status: 'SENDING',
        read_at: undefined,
        created_at: 'Just now',
    };
};
