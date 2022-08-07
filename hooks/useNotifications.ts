import { useInfiniteData } from '@hooks/useInfiniteData';
import { INotification } from '@utils/types';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export const useNotifications = () => {
    const { data, isLoading, isError, isEmpty, hasNextPage, fetchNextPage } = useInfiniteData<INotification>(
        ['notifications'],
        '/api/notifications'
    );

    const markAsReadMutation = useMutation(() => axios.put('/api/notifications/mark-as-read'));

    const markAsRead = () => {
        if (markAsReadMutation.isLoading) return;

        markAsReadMutation.mutate();
    };

    return {
        data,
        isLoading,
        isError,
        isEmpty,
        hasNextPage,
        fetchNextPage,
        markAsRead,
    };
};
