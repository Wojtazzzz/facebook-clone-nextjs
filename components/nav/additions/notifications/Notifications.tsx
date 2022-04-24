import { memo } from 'react';

import { Header } from '@components/nav/additions/shared/Header';
import { NotificationsList } from '@components/nav/additions/notifications/NotificationsList';
import { MarkAsRead } from '@components/nav/additions/notifications/MarkAsRead';
import { usePaginationData } from '@hooks/usePaginationData';

export const Notifications = memo(() => {
    const { data, state, isEmpty, isReachedEnd, loadMore } = usePaginationData('/api/notifications');

    return (
        <div
            data-testid="notifications-container"
            className="min-w-[300px] md:min-w-[360px] flex flex-col bg-dark-200 absolute top-full -right-12 shadow-md rounded-md p-3"
        >
            <Header testid="notifications-header" title="Notifications" />
            {isEmpty || <MarkAsRead />}

            <div
                id="list-of-notifications"
                className="w-full max-h-[500px] overflow-y-scroll scrollbar-thin scrollbar-thumb-dark-100"
            >
                <NotificationsList
                    data={data}
                    state={state}
                    isEmpty={isEmpty}
                    isReachedEnd={isReachedEnd}
                    loadMore={loadMore}
                />
            </div>
        </div>
    );
});

Notifications.displayName = 'Notifications';
