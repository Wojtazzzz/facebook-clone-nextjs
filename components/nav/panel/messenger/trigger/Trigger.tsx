import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons';
import * as Popover from '@radix-ui/react-popover';
import { PopoverTrigger } from '../../inc/PopoverTrigger';
import { useCheckForUnread } from './useCheckForUnread';

interface TriggerProps {
    open: () => void;
}

export const Trigger = ({ open }: TriggerProps) => {
    const { data } = useCheckForUnread();

    return (
        <Popover.Trigger aria-label="Messenger" onClick={open}>
            <PopoverTrigger icon={faFacebookMessenger} withAlert={data} />
        </Popover.Trigger>
    );
};
