import { Fragment, memo } from 'react';
import { useInfiniteData } from '@hooks/useInfiniteData';

import InfiniteScroll from 'react-infinite-scroll-component';
import { Conversation } from '@components/nav/panel/messenger/list/Conversation';
import { Loader } from '@components/nav/panel/inc/Loader';
import { ApiError } from '@components/inc/ApiError';
import { EmptyList } from '@components/inc/EmptyList';

import type { IUser } from '@utils/types';

export const List = memo(() => {
    const { data, isLoading, isError, isEmpty, hasNextPage, fetchNextPage } = useInfiniteData<IUser>(
        ['messages'],
        '/api/messages'
    );

    if (isLoading) return <Loader testId="messenger-fetching_loader" />;
    if (!data || isError) return <ApiError />;
    if (isEmpty) return <EmptyList title="Your Messenger is empty" />;

    const ConversationsComponents = data.pages.map((page) => (
        <Fragment key={page.current_page}>
            {page.data.map((friend) => (
                <Conversation key={friend.id} friend={friend} />
            ))}
        </Fragment>
    ));

    return (
        <div
            data-testid="messenger-list"
            id="list-of-messenger-contacts"
            className="w-full h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-dark-100"
        >
            <InfiniteScroll
                dataLength={ConversationsComponents.length}
                hasMore={!!hasNextPage}
                scrollableTarget="list-of-messenger-contacts"
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
