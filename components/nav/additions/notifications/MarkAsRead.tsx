import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useAxios } from '@hooks/useAxios';
import { usePaginationData } from '@hooks/usePaginationData';

import { StateStatus } from '@enums/StateStatus';
import { StatePaginationStatus } from '@enums/StatePaginationStatus';

import type { NotificationType } from '@ctypes/features/NotificationType';

export const MarkAsRead = () => {
	const { data, state, isEmpty, reloadData } = usePaginationData('/api/notifications');

	const { state: axiosState, sendRequest } = useAxios();
	const [isHidden, setIsHidden] = useState(false);
	const colorRef = useRef('text-light-100');

	const notificationsToMark = (data as NotificationType[])?.map(({ id }) => id);
	let isAllowedToUse = !(
		isEmpty ||
		state !== StatePaginationStatus.SUCCESS ||
		axiosState.status !== StateStatus.EMPTY
	);

	useEffect(() => {
		if (axiosState.status === StateStatus.SUCCESS) {
			colorRef.current = 'text-green-400';
			reloadData();

			setIsHidden(true);
		} else if (axiosState.status === StateStatus.ERROR) {
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
