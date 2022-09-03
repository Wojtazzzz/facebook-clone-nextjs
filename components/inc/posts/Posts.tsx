import InfiniteScroll from 'react-infinite-scroll-component';
import { ApiError } from '@components/inc/ApiError';
import { EmptyList } from '@components/inc/EmptyList';
import type { IPostList } from '@utils/types';
import { Loader } from './Loader';
import { Post } from './post/Post';
import { useGetPosts } from './useGetPosts';

interface PostsProps {
    postsList: IPostList;
    userId: number | undefined;
}

export const Posts = ({ postsList, userId }: PostsProps) => {
    const { data, isLoading, isError, isEmpty, hasNextPage, fetchNextPage, queryKey } = useGetPosts(postsList, userId);

    if (isLoading || !!!userId) return <Loader />;
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
