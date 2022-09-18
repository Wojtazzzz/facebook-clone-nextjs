import { Dropdown } from '../inc/Dropdown';
import { useMessenger } from './useMessenger';
import { memo } from 'react';
import * as Popover from '@radix-ui/react-popover';
import { Trigger } from './Trigger';

export const Messenger = memo(() => {
    const { isActive, open, close } = useMessenger();

    return (
        <Popover.Root open={isActive}>
            <Trigger open={open} />
            <Dropdown type="Messenger" close={close} />
        </Popover.Root>
    );
});

Messenger.displayName = 'Messenger';
