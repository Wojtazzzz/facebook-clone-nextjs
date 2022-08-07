import { List } from '@components/pages/posts/post/comments/List';
import { Create } from '@components/pages/posts/post/comments/create/Create';
import { LoadMore } from '@components/pages/posts/post/comments/inc/LoadMore';
import { useInfiniteData } from '@hooks/useInfiniteData';
import { IComment } from '@utils/types';

interface CommentsProps {
    postId: number;
}

export const Comments = ({ postId }: CommentsProps) => {
    const { data, isLoading, isError, hasNextPage, isFetchingNextPage, fetchNextPage } = useInfiniteData<IComment>(
        ['comments', `${postId}`],
        `/api/posts/${postId}/comments`
    );

    return (
        <section aria-label="Post comments" className="w-full border-t-2 border-t-dark-100 p-2">
            <Create postId={postId} />
            <List data={data} isLoading={isLoading} isError={isError} />
            <LoadMore hasNextPage={hasNextPage} isFetchingNextPage={isFetchingNextPage} fetchNextPage={fetchNextPage} />
        </section>
    );
};
