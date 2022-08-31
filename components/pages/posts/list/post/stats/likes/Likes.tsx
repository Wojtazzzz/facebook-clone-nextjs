import { LikesTooltip } from '@components/inc/likesTooltip/LikesTooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { useGetPostLikes } from './useGetPostLikes';
import { useTooltip } from '@hooks/useTooltip';

interface LikesProps {
    postId: number;
    count: number;
}

export const Likes = ({ postId, count }: LikesProps) => {
    const { isOpen, toggle } = useTooltip();

    const { data, isLoading, isError } = useGetPostLikes(postId, {
        enabled: isOpen,
    });

    return (
        <LikesTooltip isOpen={isOpen} toggle={toggle} data={data} isLoading={isLoading} isError={isError}>
            <div data-testid="post-likesTrigger" className="flex items-center gap-2">
                <div className="w-5 h-5 flex justify-center items-center bg-primary rounded-full">
                    <FontAwesomeIcon icon={faThumbsUp} className="text-xs text-white" />
                </div>

                <span data-testid="post-likesCount">{count}</span>
            </div>
        </LikesTooltip>
    );
};
