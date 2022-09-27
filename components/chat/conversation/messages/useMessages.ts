import { useInfiniteData } from '@hooks/useInfiniteData';
import { axios } from '@libs/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getChatQK } from '@utils/queryKeys';
import type { IChatMessage } from '@utils/types';

export const useMessages = (friendId: number) => {
    const queryClient = useQueryClient();
    const mutation = useMutation(mutationFn);

    return useInfiniteData<IChatMessage>({
        queryKey: getChatQK(friendId),
        endpoint: `/api/messages/${friendId}`,
        options: {
            onSuccess: (data) => {
                if (!data) return;

                const ids = data.pages.flatMap((page) =>
                    page.data.flatMap((message) => {
                        if (!message.read_at && message.is_received) {
                            return message.id;
                        }

                        return [];
                    })
                );

                if (!ids.length) return;

                mutation.mutate(friendId, {
                    onSuccess: () => queryClient.invalidateQueries(['messenger', 'checkUnread']),
                });
            },
        },
    });
};

const mutationFn = (friendId: number) => axios.put(`/api/messages/${friendId}/update`);
