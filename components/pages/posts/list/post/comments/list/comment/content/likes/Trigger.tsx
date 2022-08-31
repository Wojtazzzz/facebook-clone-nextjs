import * as ReactTooltip from '@radix-ui/react-tooltip';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface TriggerProps {
    count: number;
}

export const Trigger = ({ count }: TriggerProps) => {
    return (
        <ReactTooltip.Trigger>
            <div className="w-5 h-5 flex justify-center items-center bg-primary rounded-full">
                <FontAwesomeIcon icon={faThumbsUp} className="text-xs text-white" />
            </div>

            {count > 1 && (
                <span data-testid="post-likes_count" className="text-light-100">
                    {count}
                </span>
            )}
        </ReactTooltip.Trigger>
    );
};
