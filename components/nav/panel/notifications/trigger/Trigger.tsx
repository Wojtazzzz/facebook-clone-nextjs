import { faBell } from '@fortawesome/free-solid-svg-icons';
import * as Popover from '@radix-ui/react-popover';
import { Button } from '../../inc/Button';
import { useCheckForUnread } from './useCheckForUnread';

interface TriggerProps {
    open: () => void;
}

export const Trigger = ({ open }: TriggerProps) => {
    const { data } = useCheckForUnread();

    return (
        <Popover.Trigger asChild>
            <div>
                <Button label="Notifications" icon={faBell} callback={open} withAlert={data} />
            </div>
        </Popover.Trigger>
    );
};
