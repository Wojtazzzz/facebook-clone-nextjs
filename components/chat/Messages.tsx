import * as React from 'react';

import { Received } from '@components/chat/shared/messages/Received';
import { Sended } from '@components/chat/shared/messages/Sended';
import { Loader } from './shared/Loader';
import { ApiError } from '@components/ApiError';
import { ChatMessageType } from '@ctypes/features/ChatMessageType';

interface MessagesProps {
	paginatedMessages?: ChatMessageType[][];
	friendId: number;
	isLoading: boolean;
	isError: boolean;
}

export const Messages: React.FC<MessagesProps> = ({ paginatedMessages = [], friendId, isLoading, isError }) => {
	if (isLoading) return <Loader />;
	if (isError) return <ApiError isSmall />;

	const MessagesComponents = paginatedMessages.map(messages =>
		messages.map(message => {
			if (message.sender_id === friendId) return <Received key={message.id} text={message.text} />;

			return <Sended key={message.id} text={message.text} />;
		})
	);

	return <div className="w-full h-full flex flex-col-reverse gap-1 text-sm overflow-y-scroll py-2">{MessagesComponents}</div>;
};
