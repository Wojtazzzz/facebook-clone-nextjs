import { SpinnerLoader } from '@components/inc/SpinnerLoader';
import { ApiError } from './ApiError';
import { EmptyList } from './EmptyList';
import { Author } from './Author';
import { useGetLikes } from './useGetLikes';

interface AuthorsListProps {
    postId: number;
}

const maxCount = 12;

export const AuthorsList = ({ postId }: AuthorsListProps) => {
    const { data, isLoading, isError } = useGetLikes(postId);

    if (isLoading) return <SpinnerLoader testId="likes-spinner" spinnerStyles="w-4 mx-auto" />;
    if (isError) return <ApiError />;
    if (!data) return <EmptyList />;

    const LikeComponents = data.map((like, i) => {
        if (i >= maxCount) return;

        return <Author key={like.id} name={like.author.name} />;
    });

    const isMore = data.length > maxCount;

    return (
        <div className="flex flex-col">
            {LikeComponents}
            {isMore && <span className="text-xs text-light-100">and {data.length - maxCount} more...</span>}
        </div>
    );
};
