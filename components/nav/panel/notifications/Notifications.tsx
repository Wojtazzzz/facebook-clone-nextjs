import { memo } from 'react';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { Dropdown } from '../inc/Dropdown';
import { useNotifications } from './useNotifications';
import { Button } from '../inc/Button';

export const Notifications = memo(() => {
    const { isActive, open, close } = useNotifications();

    return (
        <div className="relative">
            <Button label="Notifications" icon={faBell} callback={open} />

            {isActive && <Dropdown type="Notifications" close={close} />}
        </div>
    );
});

Notifications.displayName = 'Notifications';
