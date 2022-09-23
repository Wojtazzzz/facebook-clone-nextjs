import { useInfiniteData } from '@hooks/useInfiniteData';
import { axios } from '@libs/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { IChatMessage } from '@utils/types';

export const useMessages = (friendId: number) => {
    const queryClient = useQueryClient();
    const mutation = useMutation(mutationFn);

    return useInfiniteData<IChatMessage>({
        queryKey: ['chat', friendId],
        endpoint: `/api/messages/${friendId}`,
        options: {
            onSuccess: (data) => {
                if (!data) return;

                const ids = data.pages.flatMap((page) =>
                    page.data.flatMap((notification) => {
                        if (!notification.read_at) {
                            return notification.id;
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