import InfiniteScroll from 'react-infinite-scroll-component';
import { ApiError } from '@components/inc/ApiError';
import { Loader } from './Loader';
import { Post } from './post/Post';
import { useGetPosts } from './useGetPosts';
import { NoPosts } from './NoPosts';

interface PostsProps {
    queryKey: unknown[];
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
            hasMore={!!hasNextPage}
            loader={<Loader />}
            scrollableTarget="posts-list"
            className="flex flex-col gap-4 mb-12"
            style={{ height: '100%' }}
        >
            {PostsComponents}
        </InfiniteScroll>
    );
};
