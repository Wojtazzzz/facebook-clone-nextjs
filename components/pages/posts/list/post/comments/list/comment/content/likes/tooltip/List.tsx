import { SpinnerLoader } from '@components/inc/SpinnerLoader';
import { faFaceSadTear } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGetCommentLikes } from './useGetCommentLikes';

interface ListProps {
    commentId: number;
}

const maxCount = 12;

export const List = ({ commentId }: ListProps) => {
    const { data, isLoading, isError } = useGetCommentLikes(commentId);

    if (isLoading) return <SpinnerLoader testId="likes-spinner" spinnerStyles="w-4 mx-auto" />;
    if (isError)
        return <FontAwesomeIcon data-testid="likes-apiError" icon={faFaceSadTear} className="text-xl text-red-400" />;
    if (!data) return <span className="text-xs text-light-100">Empty...</span>;

    const LikeComponents = data.map((like, i) => {
        if (i >= maxCount) return;

        return (
            <span key={like.author.id} aria-label="Like added by" className="text-xs text-light-100">
                {like.author.name}
            </span>
        );
    });

    const isMore = data.length > maxCount;

    return (
        <div className="flex flex-col">
            {LikeComponents}
            {isMore && <span className="text-xs text-light-100">and {data.length - maxCount} more...</span>}
        </div>
    );
};
