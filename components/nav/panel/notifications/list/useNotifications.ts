import { useInfiniteData } from '@hooks/useInfiniteData';
import { axios } from '@libs/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getCheckUnreadNotificationsQK, getNotificationsQK } from '@utils/queryKeys';
import type { INotification } from '@utils/types';

export const useNotifications = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation(mutationFn);

    return useInfiniteData<INotification>({
        queryKey: getNotificationsQK(),
        endpoint: '/api/notifications',
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

                mutation.mutate(
                    { ids },
                    { onSuccess: () => queryClient.invalidateQueries(getCheckUnreadNotificationsQK()) }
                );
            },
        },
    });
};

type IMutationData = {
    ids: string[];
};

const mutationFn = (data: IMutationData) => axios.put('/api/notifications', data);
