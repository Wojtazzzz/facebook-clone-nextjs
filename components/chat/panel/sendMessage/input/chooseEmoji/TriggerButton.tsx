import * as ReactTooltip from '@radix-ui/react-tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmile } from '@fortawesome/free-solid-svg-icons';

interface TriggerButtonProps {
    open: () => void;
}

export const TriggerButton = ({ open }: TriggerButtonProps) => {
    return (
        <ReactTooltip.Trigger asChild>
            <button
                type="button"
                title="Choose an emoji"
                aria-label="Choose an emoji"
                className="flex items-center hover:opacity-90 transition-opacity"
                onClick={open}
            >
                <FontAwesomeIcon icon={faSmile} className="text-xl" />
            </button>
        </ReactTooltip.Trigger>
    );
};
