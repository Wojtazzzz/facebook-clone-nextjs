import InfiniteScroll from 'react-infinite-scroll-component';
import { ApiError } from '@components/inc/ApiError';
import { Loader } from './loader/Loader';
import { Post } from './post/Post';
import { useGetPosts } from './useGetPosts';
import { NoPosts } from './NoPosts';
import type { QueryKey } from '@tanstack/react-query';

interface PostsProps {
    queryKey: QueryKey;
    endpoint: string;
}

export const Posts = ({ queryKey, endpoint }: PostsProps) => {
    const { data, isLoading, isError, isEmpty, hasNextPage, fetchNextPage } = useGetPosts(queryKey, endpoint);

    if (isLoading) return <Loader />;
    if (!data || isError) return <ApiError size="xl" styles="mt-8" />;
    if (isEmpty) return <NoPosts queryKey={queryKey} />;

    const PostsComponents = data.map((post) => <Post key={post.id} queryKey={queryKey} {...post} />);

    return (
        <InfiniteScroll
            dataLength={PostsComponents.length}
            next={fetchNextPage}
            hasMore={Boolean(hasNextPage)}
            loader={<Loader />}
            className="flex flex-col gap-2 md:gap-3"
        >
            {PostsComponents}
        </InfiniteScroll>
    );
};
