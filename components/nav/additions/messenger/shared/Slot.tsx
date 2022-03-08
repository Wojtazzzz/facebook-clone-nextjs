import * as React from 'react';
import { useAppDispatch } from '@hooks/redux';

import { Avatar } from '@components/Avatar';

import { toggleActive as toggleActiveChat } from '@redux/slices/ChatSlice';
import { toggleActive as toggleActiveMessenger } from '@redux/slices/MessengerSlice';

import type { MessengerContactType } from '@ctypes/features/MessengerContactType';

interface SlotProps extends MessengerContactType {}

export const Slot = ({
	id,
	first_name,
	last_name,
	profile_image,
	background_image,
	message,
	created_at,
}: SlotProps) => {
	const dispatch = useAppDispatch();

	const handleOpenChat = () => {
		dispatch(toggleActiveMessenger());
		dispatch(toggleActiveChat({ id, first_name, last_name, profile_image, background_image }));
	};
	return (
		<div
			className="w-full h-[72px] flex gap-3 hover:bg-dark-100 transition-colors rounded-lg cursor-pointer p-2"
			onClick={handleOpenChat}
		>
			<Avatar src={profile_image} size={56} alt={`${first_name} ${last_name}`} />

			<div className="flex flex-col">
				<span className="text-light-200">
					{first_name} {last_name}
				</span>

				<span className="text-sm text-light-100">{message.substring(0, 24)}..</span>
			</div>
		</div>
	);
};
