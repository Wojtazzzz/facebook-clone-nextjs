import { memo } from 'react';
import { usePaginatedData } from '@hooks/usePaginatedData';

import InfiniteScroll from 'react-infinite-scroll-component';
import { Loader } from '@components/chat/messages/Loader';
import { Message } from '@components/chat/messages/Message';
import { EmptyChat } from '@components/chat/messages/EmptyChat';
import { ApiError } from '@components/inc/ApiError';

import type { IChatMessage } from '@utils/types';

interface MessagesProps {
    friendId: number;
}

export const Messages = memo<MessagesProps>(({ friendId }) => {
    const { data, state, isEmpty, isReachedEnd, loadMore } = usePaginatedData<IChatMessage>(
        `/api/messages/${friendId}`
    );

    if (state === 'LOADING') return <Loader testid="messages-loader_loading" />;
    if (state === 'ERROR') return <ApiError />;
    if (isEmpty) return <EmptyChat />;

    const MessagesComponents = data.map((message) => <Message key={message.id} {...message} />);

    return (
        <div
            data-testid="chat-messages"
            id="list-of-messages"
            className="w-full max-h-[350px] overflow-y-scroll scrollbar-thin scrollbar-thumb-dark-100 scrollbar-track-dark-200 pb-2"
        >
            <InfiniteScroll
                dataLength={MessagesComponents.length}
                next={loadMore}
                className="flex flex-col-reverse gap-1"
                inverse={true}
                hasMore={!isReachedEnd}
                loader={<Loader testid="messages-loader_fetching" />}
                scrollableTarget="list-of-messages"
            >
                {MessagesComponents}
            </InfiniteScroll>
        </div>
    );
});

Messages.displayName = 'Messages';
