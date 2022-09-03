import { ApiError } from '@components/inc/ApiError';
import type { IComment } from '@utils/types';
import { Loader } from './Loader';
import { Comment } from './comment/Comment';

interface ListProps {
    data: IComment[] | undefined;
    isLoading: boolean;
    isEmpty: boolean;
    isError: boolean;
}

export const List = ({ data, isLoading, isEmpty, isError }: ListProps) => {
    if (isLoading) return <Loader />;
    if (!data || isError) return <ApiError styles="my-1" />;
    if (isEmpty) return null;

    const CommentsComponents = data.map((comment) => <Comment key={comment.id} {...comment} />);

    return (
        <div data-testid="post-comments_list" className="flex flex-col items-start gap-1 mt-2">
            {CommentsComponents}
        </div>
    );
};
