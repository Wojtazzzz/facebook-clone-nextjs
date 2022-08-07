import InfiniteScroll from 'react-infinite-scroll-component';
import { Post } from '@components/pages/posts/post/Post';
import { Loader } from '@components/pages/posts/Loader';
import { ApiError } from '@components/inc/ApiError';
import { EmptyList } from '@components/inc/EmptyList';

import React from 'react';
import { useInfiniteData } from '@hooks/useInfiniteData';
import { IPost } from '@utils/types';

interface PostsProps {
    queryKey: string[];
    path: string;
}

export const Posts = ({ queryKey, path }: PostsProps) => {
    const { data, isLoading, isError, isEmpty, hasNextPage, fetchNextPage } = useInfiniteData<IPost>(queryKey, path);

    if (isLoading) return <Loader testId="boardPosts-loading_loader" />;
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
        <div
            data-testid="board-posts"
            id="profile-board-posts"
            className="w-full h-screen flex flex-col gap-4 overflow-auto scroll-smooth scrollbar-none"
        >
            <InfiniteScroll
                dataLength={PostsComponents.length}
                next={fetchNextPage}
                hasMore={!!hasNextPage}
                loader={<Loader testId="boardPosts-fetching_loader" />}
                scrollableTarget="profile-board-posts"
                className="flex flex-col gap-4 mb-12"
            >
                {PostsComponents}
            </InfiniteScroll>
        </div>
    );
};
