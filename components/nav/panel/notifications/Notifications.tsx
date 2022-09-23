import { memo } from 'react';
import { Dropdown } from '../inc/Dropdown';
import { useNotifications } from './useNotifications';
import * as Popover from '@radix-ui/react-popover';
import { Trigger } from './trigger/Trigger';

export const Notifications = memo(() => {
    const { isActive, open, close } = useNotifications();

    return (
        <Popover.Root open={isActive}>
            <Trigger open={open} />
            <Dropdown type="Notifications" close={close} />
        </Popover.Root>
    );
});

Notifications.displayName = 'Notifications';
