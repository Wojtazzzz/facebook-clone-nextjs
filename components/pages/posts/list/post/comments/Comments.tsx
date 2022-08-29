import { useInfiniteData } from '@hooks/useInfiniteData';
import type { IComment } from '@utils/types';
import { Create } from './create/Create';
import { List } from './list/List';
import { LoadMore } from './LoadMore';
import { TurnedOff } from './TurnedOff';

interface CommentsProps {
    postId: number;
    authorName: string;
    commenting: boolean;
}

export const Comments = ({ postId, authorName, commenting }: CommentsProps) => {
    const { data, isLoading, isError, isEmpty, hasNextPage, isFetchingNextPage, fetchNextPage } =
        useInfiniteData<IComment>({
            queryKey: ['comments', postId],
            endpoint: `/api/posts/${postId}/comments`,
            options: { enabled: commenting },
        });

    if (!commenting) return <TurnedOff authorName={authorName} />;

    return (
        <section aria-label="Post comments" className="w-full border-t-2 border-t-dark-100 p-2">
            <Create postId={postId} />
            <List data={data} isLoading={isLoading} isError={isError} isEmpty={isEmpty} />

            <LoadMore
                isEmpty={isEmpty}
                hasNextPage={hasNextPage}
                isFetchingNextPage={isFetchingNextPage}
                fetchNextPage={fetchNextPage}
            />
        </section>
    );
};
