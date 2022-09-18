import { faBell } from '@fortawesome/free-solid-svg-icons';
import * as Popover from '@radix-ui/react-popover';
import { Button } from '../inc/Button';

interface TriggerProps {
    open: () => void;
}

export const Trigger = ({ open }: TriggerProps) => {
    return (
        <Popover.Trigger asChild>
            <div>
                <Button label="Notifications" icon={faBell} callback={open} />
            </div>
        </Popover.Trigger>
    );
};
