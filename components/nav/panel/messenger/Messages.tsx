import { memo } from 'react';
import { usePaginationData } from '@hooks/usePaginationData';

import InfiniteScroll from 'react-infinite-scroll-component';
import { Friend } from '@components/nav/panel/messenger/Friend';
import { Loader } from '@components/nav/panel/inc/Loader';
import { ApiError } from '@components/inc/ApiError';
import { EmptyList } from '@components/nav/panel/inc/EmptyList';

import type { UserType } from '@ctypes/features/UserType';

export const Messages = memo(() => {
    const { data, state, isEmpty, isReachedEnd, loadMore } = usePaginationData('/api/messages/messenger');

    if (state === 'LOADING') return <Loader testid="messenger-fetching_loader" />;
    if (state === 'ERROR') return <ApiError isSmall />;
    if (isEmpty || !data) return <EmptyList title="Your Messenger is empty" />;

    const MessagesComponents = (data as UserType[]).map((friend) => <Friend key={friend.id} {...friend} />);

    return (
        <div data-testid="messenger-messages">
            <InfiniteScroll
                dataLength={MessagesComponents.length}
                next={loadMore}
                hasMore={!isReachedEnd}
                loader={<Loader />}
                scrollableTarget="list-of-messenger-contacts"
            >
                {MessagesComponents}
            </InfiniteScroll>
        </div>
    );
});

Messages.displayName = 'Messages';