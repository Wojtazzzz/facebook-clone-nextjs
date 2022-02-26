import * as React from 'react';
import { useAppSelector } from '@hooks/redux';

import { Header } from '@components/chat/Header';
import { Messages } from '@components/chat/Messages';
import { Panel } from '@components/chat/Panel';

export const Chat: React.FC = () => {
	const { friend } = useAppSelector(state => state.chat);

	if (!friend) return null;

	return (
		<div className="w-[300px] h-[420px] flex flex-col justify-between bg-dark-200 absolute bottom-0 right-20 rounded-t-lg shadow-md">
			<Header name={`${friend.first_name} ${friend.last_name}`} profileImage={friend.profile_image} />
			<Messages friendId={friend.id} />
			<Panel />
		</div>
	);
};
