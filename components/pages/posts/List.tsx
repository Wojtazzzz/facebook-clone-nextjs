import { memo } from 'react';
import { usePaginationData } from '@hooks/usePaginationData';

import InfiniteScroll from 'react-infinite-scroll-component';
import { SinglePost } from '@components/pages/posts/post/SinglePost';
import { Loader } from '@components/pages/posts/Loader';
import { ApiError } from '@components/ApiError';
import { EmptyList } from '@components/EmptyList';

import { StatePaginationStatus } from '@enums/StatePaginationStatus';

import type { PostType } from '@ctypes/features/PostType';

export const List = memo(() => {
    const { data, state, isEmpty, isReachedEnd, loadMore } = usePaginationData('/api/posts', 15);

    if (state === StatePaginationStatus.LOADING) return <Loader />;
    if (state === StatePaginationStatus.ERROR) return <ApiError />;
    if (isEmpty || !data) return <EmptyList title="No posts, add some friends!" />;

    const PostsComponents = (data as PostType[]).map((post) => <SinglePost key={post.id} {...post} />);

    return (
        <InfiniteScroll
            dataLength={PostsComponents.length}
            next={loadMore}
            hasMore={!isReachedEnd}
            loader={<Loader />}
            scrollableTarget="scrollableDiv"
            className="flex flex-col gap-4 pb-[200px] mb-12"
            pullDownToRefreshThreshold={100}
        >
            {PostsComponents}
        </InfiniteScroll>
    );
});

List.displayName = 'List';
