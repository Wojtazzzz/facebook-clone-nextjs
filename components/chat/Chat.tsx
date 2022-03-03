import * as React from 'react';
import { useAppSelector } from '@hooks/redux';

import { Header } from '@components/chat/Header';
import { Messages } from '@components/chat/Messages';
import { Panel } from '@components/chat/Panel';

export const Chat = () => {
	const { friend } = useAppSelector(state => state.chat);

	if (!friend) return;

	const { id, first_name, last_name, profile_image } = friend;

	return (
		<div
			data-testid="chat"
			className="w-[300px] h-[420px] flex flex-col justify-between bg-dark-200 absolute bottom-0 right-20 rounded-t-lg shadow-md"
		>
			<Header name={`${first_name} ${last_name}`} profileImage={profile_image} />
			<Messages friendId={id} name={`${first_name} ${last_name}`} profileImage={profile_image} />
			<Panel friendId={id} />
		</div>
	);
};
