import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons';
import * as Popover from '@radix-ui/react-popover';
import { Button } from '../inc/Button';

interface TriggerProps {
    open: () => void;
}

export const Trigger = ({ open }: TriggerProps) => {
    return (
        <Popover.Trigger asChild>
            <div>
                <Button label="Messenger" icon={faFacebookMessenger} callback={open} />
            </div>
        </Popover.Trigger>
    );
};
