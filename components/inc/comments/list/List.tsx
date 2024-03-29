import { ApiError } from '@components/inc/ApiError';
import { Loader } from './Loader';
import { Comment } from './comment/Comment';
import { LoadMore } from './LoadMore';
import { useGetComments } from './useGetComments';

interface ListProps {
    postId: number;
}

export const List = ({ postId }: ListProps) => {
    const { data, isLoading, isError, isEmpty, hasNextPage, isFetchingNextPage, fetchNextPage } =
        useGetComments(postId);

    if (isLoading) return <Loader />;
    if (!data || isError) return <ApiError styles="my-1" />;
    if (isEmpty) return null;

    const CommentsComponents = data.map((comment) => <Comment key={comment.id} {...comment} />);

    return (
        <div className="flex flex-col gap-2 mt-1 md:mt-2">
            <div data-testid="post-comments_list" className="flex flex-col gap-1">
                {CommentsComponents}
            </div>

            <LoadMore
                isEmpty={isEmpty}
                hasNextPage={hasNextPage}
                isFetchingNextPage={isFetchingNextPage}
                fetchNextPage={() => fetchNextPage()}
            />
        </div>
    );
};
