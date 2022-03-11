import * as React from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch } from '@hooks/redux';

import { Avatar } from '@components/Avatar';

import { toggleActive } from '@redux/slices/NotificationsListSlice';
import { NotificationType as NotificationTypeEnum } from '@enums/NotificationType';

import type { NotificationType } from '@ctypes/features/NotificationType';

interface SlotProps extends NotificationType {}

export const Slot = ({ data, read_at }: SlotProps) => {
	const router = useRouter();
	const dispatch = useAppDispatch();

	const handleRedirectToInvites = () => {
		dispatch(toggleActive());
		router.push('/friends/invites');
	};

	const { initiator } = data;

	return (
		<div
			title="Invitation for friendship"
			className="w-full h-[72px] flex gap-3 hover:bg-dark-100 transition-colors rounded-lg cursor-pointer p-2"
			onClick={handleRedirectToInvites}
		>
			<Avatar src={initiator.profile_image} size={56} alt={`${initiator.first_name} ${initiator.last_name}`} />

			<div className={`flex flex-col ${read_at ? 'opacity-50' : ''}`}>
				<span className="text-light-200 font-medium">
					{initiator.first_name} {initiator.last_name}
				</span>

				<span className="text-sm text-light-100">
					{data.type === NotificationTypeEnum.FRIENDSHIP_INVITATION_SENDED ? (
						<>Send you a friendship invitation</>
					) : (
						<>Accepted your friendship invitation</>
					)}
				</span>
			</div>
		</div>
	);
};