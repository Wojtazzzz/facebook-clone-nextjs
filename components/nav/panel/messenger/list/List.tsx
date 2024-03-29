import { memo } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Conversation } from '@components/nav/panel/messenger/list/Conversation';
import { Loader } from '@components/nav/panel/inc/Loader';
import { ApiError } from '@components/inc/ApiError';
import { EmptyList } from '@components/inc/EmptyList';
import { useGetUsers } from './useGetUsers';

interface ListProps {
    close: () => void;
}

export const List = memo<ListProps>(({ close }) => {
    const { data, isLoading, isError, isEmpty, hasNextPage, fetchNextPage } = useGetUsers();

    if (isLoading) return <Loader testId="messenger-fetching_loader" />;
    if (!data || isError) return <ApiError />;
    if (isEmpty) return <EmptyList title="Messenger is empty" styles="my-5" />;

    const ConversationsComponents = data.map((friend) => (
        <Conversation key={friend.id} friend={friend} close={close} />
    ));

    return (
        <div
            data-testid="messenger-list"
            id="messenger-list"
            className="w-full h-full max-h-[350px] sm:max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-dark-100"
        >
            <InfiniteScroll
                dataLength={ConversationsComponents.length}
                hasMore={Boolean(hasNextPage)}
                scrollableTarget="messenger-list"
                loader={<Loader testId="messenger-loading_loader" />}
                className="w-full flex flex-col gap-2"
                next={fetchNextPage}
            >
                {ConversationsComponents}
            </InfiniteScroll>
        </div>
    );
});

List.displayName = 'List';
