import { useState, useEffect, useRef } from 'react';
import { useAxios } from '@hooks/useAxios';
import { usePaginationData } from '@hooks/usePaginationData';

import type { NotificationType } from '@ctypes/features/NotificationType';

export const MarkAsRead = () => {
    const { data, state, isEmpty, reloadData } = usePaginationData('/api/notifications');

    const { state: axiosState, sendRequest } = useAxios();
    const [isHidden, setIsHidden] = useState(false);
    const colorRef = useRef('text-light-100');

    const notificationsToMark = (data as NotificationType[])?.map(({ id }) => id);
    let isAllowedToUse = !(isEmpty || state !== 'SUCCESS' || axiosState.status !== 'EMPTY');

    useEffect(() => {
        if (axiosState.status === 'SUCCESS') {
            colorRef.current = 'text-green-400';
            reloadData();

            setIsHidden(true);
        } else if (axiosState.status === 'ERROR') {
            colorRef.current = 'text-red-400';
        }
    }, [axiosState.status, reloadData]);

    const handleMarkAsRead = () => {
        if (!isAllowedToUse) return;

        sendRequest({
            method: 'POST',
            url: '/api/notifications/mark-as-read',
            data: {
                notifications: notificationsToMark,
            },
        });
    };

    return (
        <div
            className={`w-full text-right transition-all delay-1000 duration-500 
            ${isHidden ? 'opacity-0' : ''}
                ${isAllowedToUse ? 'cursor-pointer' : 'cursor-not-allowed'}
            `}
            onClick={handleMarkAsRead}
        >
            <span className={`text-xs ${colorRef.current}`}>Mark all as read</span>
        </div>
    );
};
