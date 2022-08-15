import { Fragment, memo } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Loader } from '@components/pages/posts/list/Loader';
import { ApiError } from '@components/inc/ApiError';
import { EmptyList } from '@components/inc/EmptyList';
import { useInfiniteData } from '@hooks/useInfiniteData';
import type { IPost } from '@utils/types';
import { Post } from './post/Post';

export const List = memo(() => {
    const { data, isLoading, isError, isEmpty, hasNextPage, fetchNextPage } = useInfiniteData<IPost>(
        ['posts'],
        '/api/posts'
    );

    if (isLoading) return <Loader testId="postsList-loading_loader" />;
    if (!data || isError) return <ApiError size="xl" styles="mt-8" />;
    if (isEmpty) return <EmptyList title="No posts, add some friends!" />;

    const PostsComponents = data.pages.map((page) => (
        <Fragment key={page.current_page}>
            {page.data.map((post) => (
                <Post key={post.id} {...post} />
            ))}
        </Fragment>
    ));

    return (
        <InfiniteScroll
            dataLength={PostsComponents.length}
            next={fetchNextPage}
            hasMore={!!hasNextPage}
            loader={<Loader testId="postsList-fetching_loader" />}
            scrollableTarget="posts-list"
            className="flex flex-col gap-4 mb-12"
        >
            {PostsComponents}
        </InfiniteScroll>
    );
});

List.displayName = 'List';
