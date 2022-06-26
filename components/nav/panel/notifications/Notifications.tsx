import { memo } from 'react';
import { useAppDispatch } from '@hooks/redux';
import { useKey } from '@hooks/useKey';

import { Header } from '@components/nav/panel/inc/Header';
import { List } from '@components/nav/panel/notifications/List';
import { CloseOverlay } from '@components/inc/CloseOverlay';

import { toggleActive } from '@redux/slices/NotificationsSlice';

export const Notifications = memo(() => {
    const dispatch = useAppDispatch();
    const handleCloseNotifications = () => dispatch(toggleActive(false));
    useKey('Escape', handleCloseNotifications);

    return (
        <>
            <div
                data-testid="notifications-container"
                className="min-w-[300px] md:min-w-[360px] flex flex-col bg-dark-200 absolute top-full -right-12 z-20 shadow-md rounded-md p-3"
            >
                <Header testid="notifications-header" title="Notifications" />

                <div
                    id="list-of-notifications"
                    className="w-full max-h-[500px] overflow-y-scroll scrollbar-thin scrollbar-thumb-dark-100"
                >
                    <List />
                </div>
            </div>

            <CloseOverlay testid="notifications-overlay" zIndex={10} callback={handleCloseNotifications} />
        </>
    );
});

Notifications.displayName = 'Notifications';
