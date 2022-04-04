import { memo } from 'react';
import { usePaginationData } from '@hooks/usePaginationData';

import InfiniteScroll from 'react-infinite-scroll-component';
import { Slot } from '@components/nav/additions/messenger/Slot';
import { Loader } from '@components/nav/additions/shared/Loader';
import { ApiError } from '@components/ApiError';
import { EmptyList } from '@components/nav/additions/shared/EmptyList';

import { StatePaginationStatus } from '@enums/StatePaginationStatus';

import type { MessengerNotificationType } from '@ctypes/features/MessengerNotificationType';

export const Messages = memo(() => {
    const { data, state, isEmpty, isReachedEnd, loadMore } = usePaginationData('/api/messages/messenger');

    if (state === StatePaginationStatus.LOADING) return <Loader />;
    if (state === StatePaginationStatus.ERROR) return <ApiError isSmall />;
    if (isEmpty || !data) return <EmptyList title="Your Messenger is empty" />;

    const ContactsComponents = (data as MessengerNotificationType[]).map((contact) => (
        <Slot key={contact.id} {...contact} />
    ));

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
