import { axios } from '@libs/axios';
import type { IChatMessage, IPaginatedResponse } from '@utils/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { UseMutationResult } from '@tanstack/react-query';
import type { InfiniteData } from '@tanstack/react-query';
import { v4 as uuid } from 'uuid';
import type { AxiosError, AxiosResponse } from 'axios';
import { useChat } from '@hooks/useChat';

export const useSendMessage = () => {
    const queryClient = useQueryClient();
    const { friend, setError, clearError } = useChat();

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

        // Chat component is listening for new messages, so invalidate is needless
        onSuccess: () => {
            clearError();
        },

        onError: (error, newTodo, context) => {
            if (!friend || !context) return;

            setError(error);

            queryClient.setQueryData(['chat', friend.id], context.previousMessages);
        },

        onSettled: () => {
            if (!friend) return;

            queryClient.invalidateQueries(['chat', friend.id]);
        },
    });

    const sendMessage = (content: string) => {
        if (!friend) return;

        mutation.mutate({
            content,
            receiver_id: friend.id,
        });
    };

    return {
        sendMessage,
        ...mutation,
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
