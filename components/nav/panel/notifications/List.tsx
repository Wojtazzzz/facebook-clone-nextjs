import { memo } from 'react';

import InfiniteScroll from 'react-infinite-scroll-component';
import { Notification } from '@components/nav/panel/notifications/Notification';
import { Loader } from '@components/nav/panel/inc/Loader';
import { EmptyList } from '@components/nav/panel/inc/EmptyList';
import { ApiError } from '@components/inc/ApiError';

import type { NotificationType } from '@ctypes/features/NotificationType';
import type { UsePaginationDataState } from '@ctypes/UsePaginationDataState';

interface ListProps {
    data: NotificationType[];
    state: UsePaginationDataState;
    isEmpty: boolean;
    isReachedEnd: boolean;
    loadMore: () => void;
}

export const List = memo<ListProps>(({ data, state, isEmpty, isReachedEnd, loadMore }) => {
    if (state === 'LOADING') return <Loader testid="notifications-fetching_loader" />;
    if (state === 'ERROR') return <ApiError isSmall />;
    if (isEmpty || !data) return <EmptyList title="Your Notifications list is empty" />;

    const NotificationsComponents = (data as NotificationType[]).map((notification) => (
        <Notification key={notification.id} {...notification} />
    ));

    return (
        <InfiniteScroll
            dataLength={NotificationsComponents.length}
            next={loadMore}
            hasMore={!isReachedEnd}
            loader={<Loader />}
            scrollableTarget="list-of-notifications"
        >
            {NotificationsComponents}
        </InfiniteScroll>
    );
});

List.displayName = 'List';
