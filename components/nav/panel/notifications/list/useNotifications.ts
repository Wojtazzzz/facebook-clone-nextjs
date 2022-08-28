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

                const unreadNotifications = data.pages.flatMap((page) =>
                    page.data.filter((notification) => !!!notification.read_at)
                );

                if (!!!unreadNotifications.length) return;

                const unreadNotificationsIds = unreadNotifications.map((notification) => notification.id);

                mutation.mutate({
                    ids: unreadNotificationsIds,
                });
            },
        },
    });
};

type IMutationData = {
    ids: string[];
};

const mutationFn = (data: IMutationData) => axios.put('/api/notifications', data);
