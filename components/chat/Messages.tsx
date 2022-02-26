import * as React from 'react';
import { useChat } from '@hooks/useChat';

import InfiniteScroll from 'react-infinite-scroll-component';
import { Loader } from '@components/chat/shared/Loader';
import { Message } from '@components/chat/shared/Message';
import { ApiError } from '@components/ApiError';

interface MessagesProps {
	friendId: number;
}

export const Messages: React.FC<MessagesProps> = ({ friendId }) => {
	const { data, isInitialLoading, isError, isReachedEnd, loadMore } = useChat(friendId);

	if (isInitialLoading) return <Loader />;
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
				loader={<h4>Loading...</h4>}
				scrollableTarget="list-of-messages"
			>
				{MessagesComponents}
			</InfiniteScroll>
		</div>
	);
};
