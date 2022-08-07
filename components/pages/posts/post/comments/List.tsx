import { Comment } from '@components/pages/posts/post/comments/inc/Comment';
import { Loader } from '@components/pages/posts/post/comments/inc/Loader';
import { ApiError } from '@components/inc/ApiError';

import React from 'react';
import type { IComment, IPaginatedResponse } from '@utils/types';
import type { InfiniteData } from '@tanstack/react-query';

interface ListProps {
    data: InfiniteData<IPaginatedResponse<IComment>> | undefined;
    isLoading: boolean;
    isError: boolean;
}

export const List = ({ data, isLoading, isError }: ListProps) => {
    if (isLoading) return <Loader testId="postsCommentsList-loading_loader" />;
    if (!data || isError) return <ApiError styles="my-1" />;

    const CommentsComponents = data.pages.map((page) => (
        <React.Fragment key={page.current_page}>
            {page.data.map((comment) => (
                <Comment key={comment.id} {...comment} />
            ))}
        </React.Fragment>
    ));

    return (
        <div data-testid="post-comments_list" className="flex flex-col items-start gap-1">
            {CommentsComponents}
        </div>
    );
};
