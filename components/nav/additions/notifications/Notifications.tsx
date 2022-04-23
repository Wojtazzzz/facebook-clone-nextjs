import { memo } from 'react';

import { Header } from '@components/nav/additions/shared/Header';
import { NotificationsList } from '@components/nav/additions/notifications/NotificationsList';
import { MarkAsRead } from '@components/nav/additions/notifications/MarkAsRead';

export const Notifications = memo(() => {
    return (
        <div className="min-w-[300px] md:min-w-[360px] flex flex-col bg-dark-200 absolute top-full -right-12 shadow-md rounded-md p-3">
            <Header testid="notifications-header" title="Notifications" />
            <MarkAsRead />

            <div
                id="list-of-notifications"
                className="w-full max-h-[500px] overflow-y-scroll scrollbar-thin scrollbar-thumb-dark-100"
            >
                <NotificationsList />
            </div>
        </div>
    );
});

Notifications.displayName = 'Notifications';
