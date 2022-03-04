import * as React from 'react';

import { Header } from '@components/chat/Header';
import { Messages } from '@components/chat/Messages';
import { Panel } from '@components/chat/Panel';

import type { UserType } from '@ctypes/features/UserType';

interface ChatProps {
	friend: UserType;
}

export const Chat = ({ friend }: ChatProps) => {
	const { id, first_name, last_name, profile_image } = friend;

	return (
		<div
			data-testid="chat"
			className="w-[300px] h-[420px] flex flex-col justify-between bg-dark-200 absolute bottom-0 right-2 md:right-20 z-40 rounded-t-lg shadow-md"
		>
			<Header name={`${first_name} ${last_name}`} profileImage={profile_image} />
			<Messages friendId={id} name={`${first_name} ${last_name}`} profileImage={profile_image} />
			<Panel friendId={id} />
		</div>
	);
};
