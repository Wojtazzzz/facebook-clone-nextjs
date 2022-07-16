import { Comment } from '@components/pages/posts/post/comments/inc/Comment';
import { Loader } from '@components/pages/posts/post/comments/inc/Loader';
import { ApiError } from '@components/inc/ApiError';

import type { IComment } from '@utils/types';
import type { IUsePaginatedDataState } from '@utils/types';

interface ListProps {
    state: IUsePaginatedDataState;
    comments: IComment[];
}

export const List = ({ state, comments }: ListProps) => {
    if (state === 'LOADING') return <Loader testId="postsCommentsList-loading_loader" />;
    if (state === 'ERROR') return <ApiError styles="my-1" />;

    const CommentsComponents = comments.map((comment) => <Comment key={comment.id} {...comment} />);

    return (
        <div data-testid="post-comments_list" className="flex flex-col items-start gap-1">
            {CommentsComponents}
        </div>
    );
};
