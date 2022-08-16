import { useInfiniteData } from '@hooks/useInfiniteData';
import { IComment } from '@utils/types';
import { Create } from './create/Create';
import { List } from './list/List';
import { LoadMore } from './LoadMore';

interface CommentsProps {
    postId: number;
}

export const Comments = ({ postId }: CommentsProps) => {
    const { data, isLoading, isError, isEmpty, hasNextPage, isFetchingNextPage, fetchNextPage } =
        useInfiniteData<IComment>(['comments', `${postId}`], `/api/posts/${postId}/comments`);

    return (
        <section aria-label="Post comments" className="w-full border-t-2 border-t-dark-100 p-2">
            <Create postId={postId} />
            <List data={data} isLoading={isLoading} isError={isError} isEmpty={isEmpty} />
            <LoadMore hasNextPage={hasNextPage} isFetchingNextPage={isFetchingNextPage} fetchNextPage={fetchNextPage} />
        </section>
    );
};
