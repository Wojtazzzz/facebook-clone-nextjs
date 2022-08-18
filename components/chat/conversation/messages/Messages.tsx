import { Fragment, memo } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Loader } from '@components/chat/conversation/messages/Loader';
import { Message } from '@components/chat/conversation/messages/Message';
import { EmptyChat } from '@components/chat/conversation/messages/EmptyChat';
import { ApiError } from '@components/inc/ApiError';
import type { IChatMessage } from '@utils/types';
import { useInfiniteData } from '@hooks/useInfiniteData';

interface MessagesProps {
    friendId: number;
}

export const Messages = memo<MessagesProps>(({ friendId }) => {
    const { data, isLoading, isError, isEmpty, hasNextPage, fetchNextPage } = useInfiniteData<IChatMessage>(
        ['chat', `${friendId}`],
        `/api/messages/${friendId}`
    );

    if (isLoading) return <Loader testid="messages-loader_loading" />;
    if (!data || isError) return <ApiError />;
    if (isEmpty) return <EmptyChat />;

    const MessagesComponents = data.pages.map((page) => (
        <Fragment key={page.current_page}>
            {page.data.map((message) => (
                <Message key={message.id} {...message} />
            ))}
        </Fragment>
    ));

    return (
        <div
            data-testid="chat-messages"
            id="list-of-messages"
            className="w-full h-full max-h-[312px] flex flex-col justify-end relative overflow-y-scroll scrollbar-thin scrollbar-thumb-dark-100 scrollbar-track-dark-200 pb-2"
        >
            <InfiniteScroll
                dataLength={MessagesComponents.length}
                next={fetchNextPage}
                className="w-full flex flex-col-reverse justify-end gap-1"
                inverse
                hasMore={!!hasNextPage}
                loader={<Loader testid="messages-loader_fetching" />}
                scrollableTarget="list-of-messages"
            >
                {MessagesComponents}
            </InfiniteScroll>
        </div>
    );
});

Messages.displayName = 'Messages';
