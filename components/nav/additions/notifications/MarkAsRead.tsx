import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useAxios } from '@hooks/useAxios';
import { useNotifications } from '@hooks/useNotifications';

import { AxiosStateStatus } from '@enums/AxiosStateStatus';

export const MarkAsRead = () => {
	const { notifications, isLoading, isError, mutate } = useNotifications();
	const { state, sendRequest } = useAxios();
	const [isHidden, setIsHidden] = useState(false);
	const colorRef = useRef('text-light-100');

	const notificationsToMark = notifications?.map(({ id }) => id);
	let isAllowedToUse = !(!!!notifications?.length || isLoading || isError || state.status !== AxiosStateStatus.EMPTY);

	useEffect(() => {
		if (state.status === AxiosStateStatus.SUCCESS) {
			colorRef.current = 'text-green-400';
			mutate();

			setIsHidden(true);
		} else if (state.status === AxiosStateStatus.ERROR) {
			colorRef.current = 'text-red-400';
		}
	}, [state.status, mutate]);

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
