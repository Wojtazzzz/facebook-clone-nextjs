import { axios } from '@libs/axios';
import type { IChatMessage, IChatMessagePayload, IPaginatedResponse } from '@utils/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { UseMutationResult } from '@tanstack/react-query';
import type { InfiniteData } from '@tanstack/react-query';
import { v4 as uuid } from 'uuid';
import type { AxiosError, AxiosResponse } from 'axios';
import { useChat } from '@hooks/useChat';

export const useCreateMessage = () => {
    const queryClient = useQueryClient();
    const { friend, setError, clearError } = useChat();

    const mutation: IMutation = useMutation(mutationFn, {
        onMutate: async (data) => {
            if (!friend) return;

            const message = createMessage(data);

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
        onSuccess: () => clearError(),

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

    const sendMessage = (data: IChatMessagePayload) => {
        if (!friend) return;

        const formData = new FormData();
        formData.append('content', data.content);
        formData.append('receiver_id', String(friend.id));
        data.images.forEach((img) => formData.append('images[]', img));

        mutation.mutate(formData);
    };

    const sendLike = () => {
        if (!friend) return;

        const formData = new FormData();
        formData.append('content', '👍');
        formData.append('receiver_id', String(friend.id));

        mutation.mutate(formData);
    };

    return {
        sendMessage,
        sendLike,
        ...mutation,
    };
};

type IMutation = UseMutationResult<
    AxiosResponse<any, any>,
    AxiosError<any, any>,
    FormData,
    {
        previousMessages: unknown;
    }
>;

type IQueryData = InfiniteData<IPaginatedResponse<IChatMessage>>;

const mutationFn = (data: FormData) => axios.post('/api/messages', data);
const createMessage = (data: FormData): IChatMessage => {
    const content = getContent(data);
    const images = getImages(data);

    return {
        id: uuid(),
        content,
        images,
        is_received: false,
        status: 'SENDING',
        read_at: undefined,
        created_at: 'Just now',
    };
};

const getContent = (data: FormData) => {
    const content = data.get('content');

    if (!content) {
        return '';
    }

    if (typeof content !== 'string') {
        return '';
    }

    return content;
};

const getImages = (data: FormData) => {
    const images = data.getAll('images[]');

    return (images as Blob[]).map((image) => URL.createObjectURL(image));
};
