import * as ReactTooltip from '@radix-ui/react-tooltip';
import { AuthorsList } from './AuthorsList';

interface TooltipProps {
    postId: number;
}

export const Tooltip = ({ postId }: TooltipProps) => {
    return (
        <ReactTooltip.Portal>
            <ReactTooltip.Content>
                <div
                    data-testid="post-likesTooltip"
                    className="flex flex-col gap-3 bg-dark-300 shadow-md rounded-lg p-3"
                >
                    <span className="text-sm text-light-100 font-medium">Likes</span>

                    <AuthorsList postId={postId} />
                </div>
            </ReactTooltip.Content>
        </ReactTooltip.Portal>
    );
};
