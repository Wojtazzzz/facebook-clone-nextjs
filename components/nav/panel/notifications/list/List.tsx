import { memo } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Notification } from '@components/nav/panel/notifications/list/Notification';
import { Loader } from '@components/nav/panel/inc/Loader';
import { EmptyList } from '@components/inc/EmptyList';
import { ApiError } from '@components/inc/ApiError';
import { useInfiniteData } from '@hooks/useInfiniteData';
import type { INotification } from '@utils/types';

export const List = memo(() => {
    const { data, isLoading, isError, isEmpty, hasNextPage, fetchNextPage } = useInfiniteData<INotification>(
        ['notifications'],
        '/api/notifications'
    );

    if (isLoading) return <Loader testId="notifications-fetching_loader" />;
    if (!data || isError) return <ApiError />;
    if (isEmpty) return <EmptyList title="Your Notifications list is empty" />;

    const NotificationsComponents = data.map((notification) => (
        <Notification key={notification.id} {...notification} />
    ));

    return (
        <div
            data-testid="notifications-list"
            id="list-of-notifications"
            className="w-full h-[500px] overflow-y-scroll scrollbar-thin scrollbar-thumb-dark-100"
        >
            <InfiniteScroll
                dataLength={NotificationsComponents.length}
                next={fetchNextPage}
                hasMore={!!hasNextPage}
                loader={<Loader testId="notifications-loading_loader" />}
                scrollableTarget="list-of-notifications"
                className="w-full flex flex-col gap-2"
            >
                {NotificationsComponents}
            </InfiniteScroll>
        </div>
    );
});

List.displayName = 'List';
