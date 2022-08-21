import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { closeChat, openChat, setChatError } from '@redux/slices/ChatSlice';
import { axios } from '@libs/axios';
import type { IChatFriend, IChatMessage, IPaginatedResponse } from '@utils/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { UseMutationResult } from '@tanstack/react-query';
import type { InfiniteData } from '@tanstack/react-query';
import { v4 as uuid } from 'uuid';
import { AxiosError, AxiosResponse } from 'axios';

export const useChat = () => {
    const dispatch = useAppDispatch();
    const friend = useAppSelector((store) => store.chat.friend);
    const queryClient = useQueryClient();
    const error = useAppSelector((store) => store.chat.error);

    const mutation: IMutation = useMutation(mutationFn, {
        onMutate: async ({ text }) => {
            if (!friend) return;

            const friendId = friend.id.toString();
            const message = createMessage(text);

            const previousMessages = queryClient.getQueryData(['chat', friendId]);
            await queryClient.cancelQueries(['chat', friendId]);

            queryClient.setQueryData<IQueryData>(['chat', friendId], (data) => {
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

            queryClient.setQueryData(['chat', friend.id.toString()], context.previousMessages);
        },

        onSettled: () => {
            if (!friend) return;

            queryClient.invalidateQueries(['chat', friend.id.toString()]);
        },
    });

    const handleOpenChat = (friend: IChatFriend) => {
        dispatch(openChat(friend));
    };

    const handleCloseChat = () => {
        dispatch(closeChat());
    };

    const handleSendMessage = (text: string) => {
        if (!friend) return;
        if (mutation.isLoading) return;

        mutation.mutate({
            text,
            receiver_id: friend.id,
        });

        // Chat component is listening for new messages, so invalidate is needless
    };

    const invalidate = (friendId: number) => {
        queryClient.invalidateQueries(['chat', `${friendId}`]);
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
        text: string;
        receiver_id: number;
    },
    {
        previousMessages: unknown;
    }
>;
type IQueryData = InfiniteData<IPaginatedResponse<IChatMessage>>;

const mutationFn = (data: { text: string; receiver_id: number }) => axios.post('/api/messages', data);
const createMessage = (text: string): IChatMessage => {
    return {
        id: uuid(),
        text,
        is_received: false,
        status: 'SENDING',
        read_at: undefined,
        created_at: 'Just now',
    };
};
