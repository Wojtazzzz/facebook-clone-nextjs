import { memo } from 'react';
import { useAppDispatch } from '@hooks/redux';
import { useKey } from '@hooks/useKey';
import { useOutsideClick } from '@hooks/useOutsideClick';

import { Header } from '@components/nav/panel/inc/Header';
import { List } from '@components/nav/panel/notifications/List';

import { toggleActive } from '@redux/slices/NotificationsSlice';

export const Notifications = memo(() => {
    const dispatch = useAppDispatch();

    const handleClose = () => dispatch(toggleActive(false));

    useKey('Escape', handleClose);
    const ref = useOutsideClick(handleClose);

    return (
        <div
            data-testid="notifications"
            ref={ref}
            className="min-w-[300px] md:min-w-[360px] flex flex-col bg-dark-200 absolute top-full -right-12 z-20 shadow-md rounded-md p-3"
        >
            <Header testid="notifications-header" title="Notifications" />
            <List />
        </div>
    );
});

Notifications.displayName = 'Notifications';
