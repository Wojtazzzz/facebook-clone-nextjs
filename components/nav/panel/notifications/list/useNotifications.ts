import { useInfiniteData } from '@hooks/useInfiniteData';
import { axios } from '@libs/axios';
import { useMutation } from '@tanstack/react-query';
import type { InfiniteData } from '@tanstack/react-query';
import type { INotification, IPaginatedResponse } from '@utils/types';

export const useNotifications = () => {
    const mutation = useMutation(mutationFn);

    return useInfiniteData<INotification>({
        queryKey: ['notifications'],
        endpoint: '/api/notifications',
        options: {
            onSuccess: (data: InfiniteData<IPaginatedResponse<INotification>> | undefined) => {
                if (!data) return;

                const ids = data.pages.flatMap((page) =>
                    page.data.flatMap((notification) => {
                        if (!notification.read_at) {
                            return notification.id;
                        }

                        return [];
                    })
                );

                if (!!!ids.length) return;

                mutation.mutate({
                    ids,
                });
            },
        },
    });
};

type IMutationData = {
    ids: string[];
};

const mutationFn = (data: IMutationData) => axios.put('/api/notifications', data);
