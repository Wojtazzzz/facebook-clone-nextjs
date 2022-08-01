import * as ReactTooltip from '@radix-ui/react-tooltip';

import { Trigger } from '@components/pages/posts/post/stats/likes/Trigger';
import { Tooltip } from '@components/pages/posts/post/stats/likes/tooltip/Tooltip';

interface LikesProps {
    postId: number;
    count: number;
}

export const Likes = ({ postId, count }: LikesProps) => {
    return (
        <ReactTooltip.Root delayDuration={300}>
            <Trigger count={count} />
            <Tooltip postId={postId} />
        </ReactTooltip.Root>
    );
};
