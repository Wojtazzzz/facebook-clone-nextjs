import * as React from 'react';
import { memo } from 'react';
import { useChat } from '@hooks/useChat';

import InfiniteScroll from 'react-infinite-scroll-component';
import { Loader } from '@components/chat/shared/Loader';
import { Message } from '@components/chat/shared/Message';
import { EmptyChat } from '@components/chat/shared/EmptyChat';
import { ApiError } from '@components/ApiError';

interface MessagesProps {
	name: string;
	profileImage: string;
	friendId: number;
}

export const Messages = memo<MessagesProps>(({ friendId }) => {
	const { data, isError, isEmpty, isReachedEnd, loadMore } = useChat(friendId);

	if (isEmpty) return <EmptyChat />;
	if (isError) return <ApiError isSmall />;

	const MessagesComponents = data.map(({ id, text, sender_id, created_at }) => (
		<Message key={id} text={text} isSended={sender_id !== friendId} created_at={created_at} />
	));

	return (
		<div
			data-testid="chat-messages"
			id="list-of-messages"
			className="w-full h-full flex flex-col-reverse text-sm overflow-auto scrollbar-thin scrollbar-thumb-dark-200 scrollbar-track-dark-100 pb-2"
		>
			<InfiniteScroll
				dataLength={MessagesComponents.length}
				next={() => loadMore()}
				className="flex flex-col-reverse gap-1"
				inverse
				hasMore={!isReachedEnd}
				loader={<Loader />}
				scrollableTarget="list-of-messages"
			>
				{MessagesComponents}
			</InfiniteScroll>
		</div>
	);
});

Messages.displayName = 'Messages';
