import useSWR from 'swr';

import { Author } from '@components/pages/posts/post/stats/likes/tooltip/Author';
import { ApiError } from 'components/pages/posts/post/stats/likes/tooltip/ApiError';
import { EmptyList } from 'components/pages/posts/post/stats/likes/tooltip/EmptyList';
import { SpinnerLoader } from '@components/inc/SpinnerLoader';

import { axios } from '@libs/axios';

import type { ILike } from '@utils/types';

interface AuthorsListProps {
    postId: number;
}

const maxCount = 12;

export const AuthorsList = ({ postId }: AuthorsListProps) => {
    const { data, error } = useSWR<ILike[]>(`/api/posts/${postId}/likes`, fetcher);

    if (!error && !data) return <SpinnerLoader spinnerStyles="w-4 mx-auto" />;
    if (!data) return <EmptyList />;
    if (error) return <ApiError />;

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

const fetcher = (url: string) =>
    axios
        .get(url)
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });
