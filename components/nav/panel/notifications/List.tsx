import { usePaginatedData } from '@hooks/usePaginatedData';
import { useNotifications } from '@hooks/useNotifications';
import { memo, useEffect } from 'react';

import InfiniteScroll from 'react-infinite-scroll-component';
import { Notification } from '@components/nav/panel/notifications/Notification';
import { Loader } from '@components/nav/panel/inc/Loader';
import { EmptyList } from '@components/nav/panel/inc/EmptyList';
import { ApiError } from '@components/inc/ApiError';

import type { INotification } from '@utils/types';

export const List = memo(() => {
    const { data, state, isEmpty, isReachedEnd, loadMore } = usePaginatedData<INotification>('/api/notifications');
    const { markAsRead } = useNotifications();

    useEffect(() => {
        if (state !== 'SUCCESS') return;

        markAsRead();
    }, [state, markAsRead]);

    if (state === 'LOADING') return <Loader testId="notifications-fetching_loader" />;
    if (state === 'ERROR') return <ApiError />;
    if (isEmpty) return <EmptyList title="Your Notifications list is empty" />;

    const NotificationsComponents = data.map((notification) => (
        <Notification key={notification.id} {...notification} />
    ));

    return (
        <InfiniteScroll
            dataLength={NotificationsComponents.length}
            next={loadMore}
            hasMore={!isReachedEnd}
            loader={<Loader testId="notifications-loading_loader" />}
            scrollableTarget="list-of-notifications"
        >
            {NotificationsComponents}
        </InfiniteScroll>
    );
});

List.displayName = 'List';
