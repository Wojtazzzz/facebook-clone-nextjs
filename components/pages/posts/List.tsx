import { memo, useRef } from 'react';
import { usePaginatedData } from '@hooks/usePaginatedData';

import InfiniteScroll from 'react-infinite-scroll-component';
import { Post } from '@components/pages/posts/post/Post';
import { Loader } from '@components/pages/posts/Loader';
import { ScrollToTop } from '@components/pages/posts/inc/ScrollToTop';
import { ApiError } from '@components/inc/ApiError';
import { EmptyList } from '@components/inc/EmptyList';

import type { PostType } from '@ctypes/features/PostType';

export const List = memo(() => {
    const { data, state, isEmpty, isReachedEnd, loadMore } = usePaginatedData<PostType>('/api/posts', 15);
    const listRef = useRef<InfiniteScroll>(null);

    if (state === 'LOADING') return <Loader testid="postsList-loading_loaders" />;
    if (state === 'ERROR') return <ApiError />;
    if (isEmpty) return <EmptyList title="No posts, add some friends!" />;

    const PostsComponents = data.map((post) => <Post key={post.id} {...post} />);

    return (
        <>
            <InfiniteScroll
                ref={listRef}
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

            <ScrollToTop postsListRef={listRef} />
        </>
    );
});

List.displayName = 'List';
