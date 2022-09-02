import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Popover from '@radix-ui/react-popover';

interface TriggerProps {
    open: () => void;
}

export const Trigger = ({ open }: TriggerProps) => {
    return (
        <Popover.Trigger aria-label="Show post settings" onClick={open}>
            <div className="w-8 h-8 flex justify-center items-center bg-dark-200 hover:bg-dark-100 transition-all rounded-full p-3">
                <FontAwesomeIcon icon={faEllipsis} className="text-lg text-light-50" />
            </div>
        </Popover.Trigger>
    );
};
