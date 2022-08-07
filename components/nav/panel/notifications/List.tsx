import { useNotifications } from '@hooks/useNotifications';
import React, { memo } from 'react';

import InfiniteScroll from 'react-infinite-scroll-component';
import { Notification } from '@components/nav/panel/notifications/Notification';
import { Loader } from '@components/nav/panel/inc/Loader';
import { EmptyList } from '@components/nav/panel/inc/EmptyList';
import { ApiError } from '@components/inc/ApiError';

export const List = memo(() => {
    const { data, isLoading, isError, isEmpty, hasNextPage, fetchNextPage, markAsRead } = useNotifications();

    if (isLoading) return <Loader testId="notifications-fetching_loader" />;
    if (!data || isError) return <ApiError />;
    if (isEmpty) return <EmptyList title="Your Notifications list is empty" />;

    const NotificationsComponents = data.pages.map((page) => (
        <React.Fragment key={page.current_page}>
            {page.data.map((notification) => (
                <Notification key={notification.id} {...notification} />
            ))}
        </React.Fragment>
    ));

    return (
        <div
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
