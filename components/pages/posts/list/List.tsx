import React, { memo, useRef } from 'react';

import InfiniteScroll from 'react-infinite-scroll-component';
import { Post } from '@components/pages/posts/post/Post';
import { Loader } from '@components/pages/posts/Loader';
import { ScrollToTop } from '@components/pages/posts/list/ScrollToTop';
import { ApiError } from '@components/inc/ApiError';
import { EmptyList } from '@components/inc/EmptyList';
import { useInfiniteData } from '@hooks/useInfiniteData';
import type { IPost } from '@utils/types';

export const List = memo(() => {
    const { data, isLoading, isError, isEmpty, hasNextPage, fetchNextPage } = useInfiniteData<IPost>(
        ['posts'],
        '/api/posts'
    );

    const listRef = useRef<InfiniteScroll>(null);

    if (isLoading) return <Loader testId="postsList-loading_loader" />;
    if (!data || isError) return <ApiError size="xl" styles="mt-8" />;
    if (isEmpty) return <EmptyList title="No posts, add some friends!" />;

    const PostsComponents = data.pages.map((page) => (
        <React.Fragment key={page.current_page}>
            {page.data.map((post) => (
                <Post key={post.id} {...post} />
            ))}
        </React.Fragment>
    ));

    return (
        <>
            <InfiniteScroll
                ref={listRef}
                dataLength={PostsComponents.length}
                next={fetchNextPage}
                hasMore={!!hasNextPage}
                loader={<Loader testId="postsList-fetching_loader" />}
                scrollableTarget="posts-list"
                className="flex flex-col gap-4 mb-12"
            >
                {PostsComponents}
            </InfiniteScroll>

            <ScrollToTop postsListRef={listRef} />
        </>
    );
});

List.displayName = 'List';
