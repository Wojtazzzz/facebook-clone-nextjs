import { usePaginatedData } from '@hooks/usePaginatedData';

import { List } from '@components/pages/posts/post/comments/List';
import { Create } from '@components/pages/posts/post/comments/create/Create';
import { LoadMore } from '@components/pages/posts/post/comments/inc/LoadMore';

import type { IComment } from '@utils/types';

interface CommentsProps {
    postId: number;
}

export const Comments = ({ postId }: CommentsProps) => {
    const { state, data, isReachedEnd, loadMore, reloadData } = usePaginatedData<IComment>(
        `/api/posts/${postId}/comments`
    );

    return (
        <section aria-label="Post comments" className="w-full border-t-2 border-t-dark-100 p-2">
            <Create postId={postId} reloadComments={reloadData} />
            <List state={state} comments={data} />

            {isReachedEnd || (
                <LoadMore isReachedEnd={isReachedEnd} isFetching={state === 'FETCHING'} callback={loadMore} />
            )}
        </section>
    );
};
