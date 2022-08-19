import { axios } from '@libs/axios';
import { useMutation } from '@tanstack/react-query';

export const useNotifications = () => {
    const mutation = useMutation(mutationFn);

    const markAsRead = () => {
        if (mutation.isLoading) return;

        mutation.mutate();
    };

    return {
        markAsRead,
        ...mutation,
    };
};

const mutationFn = () => axios.put('/api/notifications/mark-as-read');
