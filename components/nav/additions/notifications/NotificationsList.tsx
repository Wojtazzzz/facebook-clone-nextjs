import { memo, useEffect } from 'react';
import { usePaginationData } from '@hooks/usePaginationData';

import InfiniteScroll from 'react-infinite-scroll-component';
import { Slot } from '@components/nav/additions/notifications/Slot';
import { Loader } from '@components/nav/additions/shared/Loader';
import { EmptyList } from '@components/nav/additions/shared/EmptyList';
import { ApiError } from '@components/ApiError';

import type { NotificationType } from '@ctypes/features/NotificationType';
import { UsePaginationDataState } from '@ctypes/UsePaginationDataState';

interface NotificationsListProps {
    data: NotificationType[];
    state: UsePaginationDataState;
    isEmpty: boolean;
    isReachedEnd: boolean;
    loadMore: () => void;
}

export const NotificationsList = memo<NotificationsListProps>(({ data, state, isEmpty, isReachedEnd, loadMore }) => {
    if (state === 'LOADING') return <Loader testid="notifications-fetching_loader" />;
    if (state === 'ERROR') return <ApiError isSmall />;
    if (isEmpty || !data) return <EmptyList title="Your Notifications list is empty" />;

    const NotificationsComponents = (data as NotificationType[]).map((notification) => (
        <Slot key={notification.id} {...notification} />
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

NotificationsList.displayName = 'NotificationsList';
