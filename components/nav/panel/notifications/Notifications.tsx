import { memo } from 'react';
import { usePaginatedData } from '@hooks/usePaginatedData';
import { useAppDispatch } from '@hooks/redux';

import { Header } from '@components/nav/panel/inc/Header';
import { List } from '@components/nav/panel/notifications/List';
import { MarkAsRead } from '@components/nav/panel/notifications/MarkAsRead';
import { Overlay } from '@components/nav/panel/inc/Overlay';

import { toggleActive } from '@redux/slices/NotificationsListSlice';

import type { NotificationType } from '@ctypes/features/NotificationType';

export const Notifications = memo(() => {
    const notifications = usePaginatedData<NotificationType>('/api/notifications');

    const dispatch = useAppDispatch();
    const handleToggle = () => dispatch(toggleActive());

    return (
        <>
            <div
                data-testid="notifications-container"
                className="min-w-[300px] md:min-w-[360px] flex flex-col bg-dark-200 absolute top-full -right-12 z-10 shadow-md rounded-md p-3"
            >
                <Header testid="notifications-header" title="Notifications" />
                {notifications.isEmpty || <MarkAsRead />}

                <div
                    id="list-of-notifications"
                    className="w-full max-h-[500px] overflow-y-scroll scrollbar-thin scrollbar-thumb-dark-100"
                >
                    <List {...notifications} />
                </div>
            </div>

            <Overlay testid="notifications-overlay" callback={handleToggle} />
        </>
    );
});

Notifications.displayName = 'Notifications';
