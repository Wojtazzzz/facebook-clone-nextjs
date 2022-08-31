import * as ReactTooltip from '@radix-ui/react-tooltip';
import { List } from './List';

interface TooltipProps {
    commentId: number;
}

export const Tooltip = ({ commentId }: TooltipProps) => {
    return (
        <ReactTooltip.Portal>
            <ReactTooltip.Content side="top">
                <div
                    data-testid="post-likesTooltip"
                    className="flex flex-col gap-3 bg-dark-300 shadow-md rounded-lg p-3"
                >
                    <span className="text-sm text-light-100 font-medium">Likes</span>

                    <List commentId={commentId} />
                </div>
            </ReactTooltip.Content>
        </ReactTooltip.Portal>
    );
};
