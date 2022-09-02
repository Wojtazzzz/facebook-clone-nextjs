import { LikesTooltip } from '@components/inc/likesTooltip/LikesTooltip';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTooltip } from '@hooks/useTooltip';
import clsx from 'clsx';
import { useGetCommentLikes } from './useGetCommentLikes';

interface LikesProps {
    commentId: number;
    contentLength: number;
    count: number;
}

export const Likes = ({ commentId, contentLength, count }: LikesProps) => {
    const { isOpen, toggle } = useTooltip();

    const { data, isLoading, isError } = useGetCommentLikes(commentId, {
        enabled: isOpen,
    });

    return (
        <div
            className={clsx(
                'flex items-center gap-1 absolute bg-dark-100 ',
                contentLength > 20 ? '-bottom-3 -right-3' : 'bottom-1 -right-5',
                count > 1 ? 'rounded-xl py-0.5 pl-1 pr-[6px]' : 'rounded-full p-1'
            )}
        >
            <LikesTooltip isOpen={isOpen} toggle={toggle} data={data} isLoading={isLoading} isError={isError}>
                <>
                    <div
                        data-testid="comment-faTooltipIcon"
                        className="w-5 h-5 flex justify-center items-center bg-primary rounded-full"
                    >
                        <FontAwesomeIcon icon={faThumbsUp} className="text-xs text-white" />
                    </div>

                    {count > 1 && (
                        <span data-testid="comment-likesCount" className="text-light-100">
                            {count}
                        </span>
                    )}
                </>
            </LikesTooltip>
        </div>
    );
};
