import InfiniteScroll from 'react-infinite-scroll-component';
import { ApiError } from '@components/inc/ApiError';
import { EmptyList } from '@components/inc/EmptyList';
import { useInfiniteData } from '@hooks/useInfiniteData';
import type { IPost } from '@utils/types';
import { Loader } from './Loader';
import { Post } from './post/Post';

interface PostsProps {
    queryKey: unknown[];
    endpoint: string;
}

export const Posts = ({ queryKey, endpoint }: PostsProps) => {
    const { data, isLoading, isError, isEmpty, hasNextPage, fetchNextPage } = useInfiniteData<IPost>({
        queryKey,
        endpoint,
    });

    if (isLoading) return <Loader />;
    if (!data || isError) return <ApiError size="xl" styles="mt-8" />;
    if (isEmpty) return <EmptyList title="No posts, add some friends!" />;

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
