import { axios } from '@libs/axios';
import { useMutation } from '@tanstack/react-query';

export const useNotifications = () => {
    const markAsReadMutation = useMutation(() => axios.put('/api/notifications/mark-as-read'));

    const markAsRead = () => {
        if (markAsReadMutation.isLoading) return;

        markAsReadMutation.mutate();
    };

    return {
        markAsRead,
        ...markAsReadMutation,
    };
};
