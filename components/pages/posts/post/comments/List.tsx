import { usePaginationData } from '@hooks/usePaginationData';

import { Comment } from '@components/pages/posts/post/comments/inc/Comment';
import { Loader } from '@components/pages/posts/post/comments/inc/Loader';
import { LoadMore } from '@components/pages/posts/post/comments/inc/LoadMore';
import { ApiError } from '@components/inc/ApiError';

import type { CommentType } from '@ctypes/features/CommentType';

interface ListProps {
    postId: number;
}

export const List = ({ postId }: ListProps) => {
    const { data, state, isReachedEnd, loadMore } = usePaginationData<CommentType>(`/api/posts/${postId}/comments`);

    if (state === 'LOADING') return <Loader testid="postsCommentsList-loading_loaders" />;
    if (state === 'ERROR') return <ApiError />;

    const CommentsComponents = data.map((comment) => <Comment key={comment.id} {...comment} />);

    return (
        <div className="flex flex-col items-start gap-1">
            {CommentsComponents}

            {state === 'FETCHING' ? (
                <Loader testid="postsCommentsList-fetching_loaders" />
            ) : (
                <LoadMore isReachedEnd={isReachedEnd} callback={loadMore} />
            )}
        </div>
    );
};
