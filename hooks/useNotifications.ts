import { useState } from 'react';
import { useAxios } from '@hooks/useAxios';

export const useNotifications = () => {
    const [marked, setMarked] = useState(false);
    const { sendRequest } = useAxios();

    const markAsRead = () => {
        if (marked) return;

        sendRequest({
            method: 'PUT',
            url: '/api/notifications/mark-as-read',
        });

        setMarked(true);
    };

    return {
        markAsRead,
    };
};
