import * as ReactTooltip from '@radix-ui/react-tooltip';

import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface TriggerProps {
    count: number;
}

export const Trigger = ({ count }: TriggerProps) => {
    return (
        <ReactTooltip.Trigger>
            <div className="flex items-center gap-2">
                <div className="w-5 h-5 flex justify-center items-center bg-primary rounded-full">
                    <FontAwesomeIcon icon={faThumbsUp} className="text-xs text-white" />
                </div>

                <span data-testid="post-likes_count">{count}</span>
            </div>
        </ReactTooltip.Trigger>
    );
};
