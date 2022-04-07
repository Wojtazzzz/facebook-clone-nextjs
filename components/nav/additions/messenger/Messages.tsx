import { memo } from 'react';
import { usePaginationData } from '@hooks/usePaginationData';

import InfiniteScroll from 'react-infinite-scroll-component';
import { Slot } from '@components/nav/additions/messenger/Slot';
import { Loader } from '@components/nav/additions/shared/Loader';
import { ApiError } from '@components/ApiError';
import { EmptyList } from '@components/nav/additions/shared/EmptyList';

import type { UserType } from '@ctypes/features/UserType';

export const Messages = memo(() => {
    const { data, state, isEmpty, isReachedEnd, loadMore } = usePaginationData('/api/messages/messenger');

    if (state === 'LOADING') return <Loader />;
    if (state === 'ERROR') return <ApiError isSmall />;
    if (isEmpty || !data) return <EmptyList title="Your Messenger is empty" />;

    const ContactsComponents = (data as UserType[]).map((friend) => <Slot key={friend.id} {...friend} />);

    return (
        <InfiniteScroll
            dataLength={ContactsComponents.length}
            next={loadMore}
            hasMore={!isReachedEnd}
            loader={<Loader />}
            scrollableTarget="list-of-messenger-contacts"
        >
            {ContactsComponents}
        </InfiniteScroll>
    );
});

Messages.displayName = 'Messages';
