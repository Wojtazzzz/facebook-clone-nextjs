import * as React from 'react';
import { useAppDispatch } from '@hooks/redux';

import { Avatar } from '@components/Avatar';

import { toggleActive as toggleActiveChat } from '@redux/slices/ChatSlice';
import { toggleActive as toggleActiveMessenger } from '@redux/slices/MessengerSlice';

import type { MessengerNotificationType } from '@ctypes/features/MessengerNotificationType';

interface SlotProps extends MessengerNotificationType {}

export const Slot = ({ id, text, friend, created_at }: SlotProps) => {
	const dispatch = useAppDispatch();

	const handleOpenChat = () => {
		dispatch(toggleActiveMessenger());
		// dispatch(toggleActiveChat({ id }));
	};

	return (
		<div
			className="w-full h-[72px] flex gap-3 hover:bg-dark-100 transition-colors rounded-lg cursor-pointer p-2"
			onClick={handleOpenChat}
		>
			<Avatar src={friend.profile_image} size={56} alt={friend.name} />

			<div className="flex flex-col">
				<span className="text-light-200">{friend.name}</span>
				<span className="text-sm text-light-100">{text.substring(0, 24)}..</span>
			</div>
		</div>
	);
};
