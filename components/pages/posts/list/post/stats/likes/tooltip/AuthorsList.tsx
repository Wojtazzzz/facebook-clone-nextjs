import { SpinnerLoader } from '@components/inc/SpinnerLoader';
import { axios } from '@libs/axios';
import type { ILike } from '@utils/types';
import { useQuery } from '@tanstack/react-query';
import { ApiError } from './ApiError';
import { EmptyList } from './EmptyList';
import { Author } from './Author';

interface AuthorsListProps {
    postId: number;
}

const maxCount = 12;

export const AuthorsList = ({ postId }: AuthorsListProps) => {
    const { isLoading, isError, data } = useQuery<ILike[]>(['likes'], () =>
        axios.get(`/api/posts/${postId}/likes`).then((response) => response.data)
    );

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
