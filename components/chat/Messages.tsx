import * as React from 'react';
import { useChat } from '@hooks/useChat';

import InfiniteScroll from 'react-infinite-scroll-component';
import { Loader } from '@components/chat/shared/Loader';
import { Message } from '@components/chat/shared/Message';
import { ApiError } from '@components/ApiError';
import { EmptyChat } from '@components/chat/shared/EmptyChat';

interface MessagesProps {
	friendId: number;
}

export const Messages: React.FC<MessagesProps> = ({ friendId }) => {
	const { data, isError, isReachedEnd, isEmpty, loadMore } = useChat(friendId);

	if (isEmpty) return <EmptyChat />;
	if (isError) return <ApiError isSmall />;

	const MessagesComponents = data.map(({ id, sender_id, text }) => (
		<Message key={id} text={text} isSended={sender_id !== friendId} />
	));

	return (
		<div id="list-of-messages" className="w-full h-[300px] flex flex-col-reverse text-sm overflow-auto py-2">
			<InfiniteScroll
				dataLength={MessagesComponents.length}
				next={() => loadMore()}
				className="flex flex-col-reverse gap-1"
				inverse={true}
				hasMore={!isReachedEnd}
				loader={<Loader />}
				scrollableTarget="list-of-messages"
			>
				{MessagesComponents}
			</InfiniteScroll>
		</div>
	);
};
