import { Comment } from '@components/pages/posts/post/comments/inc/Comment';
import { Loader } from '@components/pages/posts/post/comments/inc/Loader';
import { LoadMore } from '@components/pages/posts/post/comments/inc/LoadMore';
import { ApiError } from '@components/inc/ApiError';

import type { CommentType } from '@ctypes/features/CommentType';
import type { UsePaginatedDataState } from '@ctypes/UsePaginatedDataState';

interface ListProps {
    state: UsePaginatedDataState;
    data: CommentType[];
    isReachedEnd: boolean;
    loadMore: () => void;
}

export const List = ({ state, data, isReachedEnd, loadMore }: ListProps) => {
    if (state === 'LOADING') return <Loader testId="postsCommentsList-loading_loader" />;
    if (state === 'ERROR') return <ApiError styles="my-1" />;

    const CommentsComponents = data.map((comment) => <Comment key={comment.id} {...comment} />);

    return (
        <div className="flex flex-col items-start gap-1">
            {CommentsComponents}

            {isReachedEnd || (
                <LoadMore isReachedEnd={isReachedEnd} isFetching={state === 'FETCHING'} callback={loadMore} />
            )}
        </div>
    );
};
