import { memo, useRef } from 'react';
import { usePaginatedData } from '@hooks/usePaginatedData';

import InfiniteScroll from 'react-infinite-scroll-component';
import { Post } from '@components/pages/posts/post/Post';
import { Loader } from '@components/pages/posts/Loader';
import { ScrollToTop } from '@components/pages/posts/inc/ScrollToTop';
import { ApiError } from '@components/inc/ApiError';
import { EmptyList } from '@components/inc/EmptyList';

import type { IPost } from '@utils/types';

export const List = memo(() => {
    const { data, state, isEmpty, isReachedEnd, reloadData, loadMore } = usePaginatedData<IPost>('/api/posts');
    const listRef = useRef<InfiniteScroll>(null);

    if (state === 'LOADING') return <Loader testId="postsList-loading_loader" />;
    if (state === 'ERROR') return <ApiError size="xl" styles="mt-8" />;
    if (isEmpty) return <EmptyList title="No posts, add some friends!" />;

    const PostsComponents = data.map((post) => <Post key={post.id} {...post} reloadPosts={reloadData} />);

    return (
        <>
            <InfiniteScroll
                ref={listRef}
                dataLength={PostsComponents.length}
                next={loadMore}
                hasMore={!isReachedEnd}
                loader={<Loader testId="postsList-fetching_loader" />}
                scrollableTarget="posts-list"
                pullDownToRefreshThreshold={100}
                className="flex flex-col gap-4 mb-12"
            >
                {PostsComponents}
            </InfiniteScroll>

            <ScrollToTop postsListRef={listRef} />
        </>
    );
});

List.displayName = 'List';
