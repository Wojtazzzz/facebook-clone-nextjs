import React, { memo } from 'react';
import { useInfiniteData } from '@hooks/useInfiniteData';

import InfiniteScroll from 'react-infinite-scroll-component';
import { Friend } from '@components/nav/panel/messenger/Friend';
import { Loader } from '@components/nav/panel/inc/Loader';
import { ApiError } from '@components/inc/ApiError';
import { EmptyList } from '@components/nav/panel/inc/EmptyList';

import type { IUser } from '@utils/types';

export const Messages = memo(() => {
    const { data, isLoading, isError, isEmpty, hasNextPage, fetchNextPage } = useInfiniteData<IUser>(
        ['messages'],
        '/api/messages'
    );

    if (isLoading) return <Loader testId="messenger-fetching_loader" />;
    if (!data || isError) return <ApiError />;
    if (isEmpty) return <EmptyList title="Your Messenger is empty" />;

    const MessagesComponents = data.pages.map((page) => (
        <React.Fragment key={page.current_page}>
            {page.data.map((friend) => (
                <Friend key={friend.id} friend={friend} />
            ))}
        </React.Fragment>
    ));

    return (
        <div
            data-testid="messenger-messages"
            id="list-of-messenger-contacts"
            className="w-full h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-dark-100"
        >
            <InfiniteScroll
                dataLength={MessagesComponents.length}
                hasMore={!!hasNextPage}
                scrollableTarget="list-of-messenger-contacts"
                loader={<Loader testId="messenger-loading_loader" />}
                className="w-full flex flex-col gap-2"
                next={fetchNextPage}
            >
                {MessagesComponents}
            </InfiniteScroll>
        </div>
    );
});

Messages.displayName = 'Messages';
