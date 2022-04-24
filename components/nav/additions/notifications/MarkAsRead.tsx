import { useState, useEffect, useRef } from 'react';
import { useAxios } from '@hooks/useAxios';

const textColor = {
    SUCCESS: 'text-green-400',
    ERROR: 'text-red-400',
} as const;

export const MarkAsRead = () => {
    const [isHidden, setIsHidden] = useState(false);
    const colorRef = useRef('text-light-100');
    const { state: axiosState, sendRequest } = useAxios();

    useEffect(() => {
        if (axiosState.status === 'SUCCESS' || axiosState.status === 'ERROR') {
            colorRef.current = textColor[axiosState.status];

            setIsHidden(true);
        }
    }, [axiosState.status]);

    const handleMarkAsRead = () => {
        sendRequest({
            method: 'POST',
            url: '/api/notifications/mark-as-read',
        });
    };

    return (
        <div
            className={`w-full text-right transition-all delay-1000 duration-500 
                ${isHidden ? 'opacity-0' : ''}
            `}
            onClick={handleMarkAsRead}
        >
            <span className={`text-xs ${colorRef.current}`}>Mark all as read</span>
        </div>
    );
};
