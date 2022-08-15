import { ApiError } from '@components/inc/ApiError';
import { Fragment } from 'react';
import type { IComment, IPaginatedResponse } from '@utils/types';
import type { InfiniteData } from '@tanstack/react-query';
import { Loader } from './Loader';
import { Comment } from './comment/Comment';

interface ListProps {
    data: InfiniteData<IPaginatedResponse<IComment>> | undefined;
    isLoading: boolean;
    isEmpty: boolean;
    isError: boolean;
}

export const List = ({ data, isLoading, isEmpty, isError }: ListProps) => {
    if (isLoading) return <Loader testId="postsCommentsList-loading_loader" />;
    if (!data || isError) return <ApiError styles="my-1" />;
    if (isEmpty) return null;

    const CommentsComponents = data.pages.map((page) => (
        <Fragment key={page.current_page}>
            {page.data.map((comment) => (
                <Comment key={comment.id} {...comment} />
            ))}
        </Fragment>
    ));

    return (
        <div data-testid="post-comments_list" className="flex flex-col items-start gap-1">
            {CommentsComponents}
        </div>
    );
};
