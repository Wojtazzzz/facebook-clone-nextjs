import { memo } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Message } from '@components/chat/conversation/messages/message/Message';
import { EmptyChat } from '@components/chat/conversation/messages/EmptyChat';
import { ApiError } from '@components/inc/ApiError';
import type { IChatFriend, IChatMessage } from '@utils/types';
import { Loader } from './Loader';
import { useMessages } from './useMessages';
import { FriendInfo } from './FriendInfo';

interface MessagesProps {
    friend: IChatFriend;
}

export const Messages = memo<MessagesProps>(({ friend }) => {
    const { id, name, profile_image } = friend;
    const { data, isLoading, isError, isEmpty, hasNextPage, fetchNextPage } = useMessages(id);

    if (isLoading) return <Loader testId="messages-loader_loading" />;
    if (!data || isError) return <ApiError />;
    if (isEmpty) return <EmptyChat name={name} profileImage={profile_image} />;

    const lastReadIndex = getLastReadIndex(data);

    const MessagesComponents = data.map((message, i) => (
        <Message senderAvatar={profile_image} isLastRead={i === lastReadIndex} key={message.id} {...message} />
    ));

    return (
        <div
            data-testid="chat-messages"
            id="chat-messages"
            className="w-full h-full max-h-[312px] flex flex-col-reverse relative overflow-y-scroll scrollbar-thin scrollbar-thumb-dark-100 scrollbar-track-dark-200 py-2 pb-2"
        >
            <InfiniteScroll
                dataLength={MessagesComponents.length}
                next={fetchNextPage}
                className="w-full flex flex-col-reverse justify-end gap-1 pr-2"
                inverse
                hasMore={Boolean(hasNextPage)}
                loader={<Loader testId="messages-loader_fetching" />}
                scrollableTarget="chat-messages"
            >
                {MessagesComponents}

                <FriendInfo name={name} profileImage={profile_image} />
            </InfiniteScroll>
        </div>
    );
});

Messages.displayName = 'Messages';

const getLastReadIndex = (messages: IChatMessage[]) => {
    return messages.findIndex(({ status, is_received }) => status === 'READ' || is_received);
};
