import { memo } from 'react';
import { usePaginatedData } from '@hooks/usePaginatedData';

import InfiniteScroll from 'react-infinite-scroll-component';
import { Friend } from '@components/nav/panel/messenger/Friend';
import { Loader } from '@components/nav/panel/inc/Loader';
import { ApiError } from '@components/inc/ApiError';
import { EmptyList } from '@components/nav/panel/inc/EmptyList';

import type { UserType } from '@ctypes/features/UserType';

export const Messages = memo(() => {
    const { data, state, isEmpty, isReachedEnd, loadMore } = usePaginatedData<UserType>('/api/messages');

    if (state === 'LOADING') return <Loader testId="messenger-fetching_loader" />;
    if (state === 'ERROR') return <ApiError />;
    if (isEmpty) return <EmptyList title="Your Messenger is empty" />;

    const MessagesComponents = data.map((friend) => <Friend key={friend.id} friend={friend} />);

    return (
        <div data-testid="messenger-messages">
            <InfiniteScroll
                dataLength={MessagesComponents.length}
                next={loadMore}
                hasMore={!isReachedEnd}
                loader={<Loader testId="messenger-loading_loader" />}
                scrollableTarget="list-of-messenger-contacts"
            >
                {MessagesComponents}
            </InfiniteScroll>
        </div>
    );
});

Messages.displayName = 'Messages';
