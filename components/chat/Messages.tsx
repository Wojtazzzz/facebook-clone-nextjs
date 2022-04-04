import { memo } from 'react';
import { usePaginationData } from '@hooks/usePaginationData';

import InfiniteScroll from 'react-infinite-scroll-component';
import { Loader } from '@components/chat/shared/Loader';
import { Message } from '@components/chat/shared/Message';
import { EmptyChat } from '@components/chat/shared/EmptyChat';
import { ApiError } from '@components/ApiError';

import { StatePaginationStatus } from '@enums/StatePaginationStatus';

import type { ChatMessageType } from '@ctypes/features/ChatMessageType';

interface MessagesProps {
    name: string;
    profileImage: string;
    friendId: number;
}

export const Messages = memo<MessagesProps>(({ friendId }) => {
    const { data, state, isEmpty, isReachedEnd, loadMore } = usePaginationData(`/api/messages/${friendId}`);

    if (state === StatePaginationStatus.LOADING) return <Loader />;
    if (state === StatePaginationStatus.ERROR) return <ApiError isSmall />;
    if (isEmpty || !data) return <EmptyChat />;

    const MessagesComponents = (data as ChatMessageType[]).map((message) => (
        <Message key={message.id} {...message} isFromLoggedUser={message.sender_id !== friendId} />
    ));

    return (
        <div
            data-testid="chat-messages"
            id="list-of-messages"
            className="w-full h-full flex flex-col-reverse text-sm overflow-auto scrollbar-thin scrollbar-thumb-dark-200 scrollbar-track-dark-100 pb-2"
        >
            <InfiniteScroll
                dataLength={MessagesComponents.length}
                next={loadMore}
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
