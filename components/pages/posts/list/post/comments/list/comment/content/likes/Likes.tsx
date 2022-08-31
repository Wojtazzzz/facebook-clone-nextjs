import * as ReactTooltip from '@radix-ui/react-tooltip';
import clsx from 'clsx';
import { Tooltip } from './tooltip/Tooltip';
import { Trigger } from './Trigger';

interface LikesProps {
    commentId: number;
    contentLength: number;
    count: number;
}

export const Likes = ({ commentId, contentLength, count }: LikesProps) => {
    if (!!!count) return null;

    return (
        <ReactTooltip.Root delayDuration={300}>
            <div
                className={clsx(
                    'flex items-center gap-1 absolute bg-dark-100 ',
                    contentLength > 20 ? '-bottom-3 -right-3' : 'bottom-1 -right-5',
                    count > 1 ? 'rounded-xl py-0.5 pl-1 pr-[6px]' : 'rounded-full p-1'
                )}
            >
                <Trigger count={count} />
                <Tooltip commentId={commentId} />
            </div>
        </ReactTooltip.Root>
    );
};
