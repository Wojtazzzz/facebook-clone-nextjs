import { faBell } from '@fortawesome/free-solid-svg-icons';
import * as Popover from '@radix-ui/react-popover';
import { PopoverTrigger } from '../../inc/PopoverTrigger';
import { useCheckForUnread } from './useCheckForUnread';

interface TriggerProps {
    open: () => void;
}

export const Trigger = ({ open }: TriggerProps) => {
    const { data } = useCheckForUnread();

    return (
        <Popover.Trigger aria-label="Notifications" onClick={open}>
            <PopoverTrigger icon={faBell} withAlert={data} />
        </Popover.Trigger>
    );
};
