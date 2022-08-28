import InfiniteScroll from 'react-infinite-scroll-component';
import { Loader } from '@components/pages/posts/list/Loader';
import { ApiError } from '@components/inc/ApiError';
import { EmptyList } from '@components/inc/EmptyList';
import { useInfiniteData } from '@hooks/useInfiniteData';
import { IPost } from '@utils/types';
import { Post } from '@components/pages/posts/list/post/Post';

interface PostsProps {
    queryKey: string[];
    path: string;
}

export const Posts = ({ queryKey, path }: PostsProps) => {
    const { data, isLoading, isError, isEmpty, hasNextPage, fetchNextPage } = useInfiniteData<IPost>({
        queryKey,
        endpoint: path,
    });

    if (isLoading) return <Loader testId="boardPosts-loading_loader" />;
    if (!data || isError) return <ApiError size="xl" styles="mt-8" />;
    if (isEmpty) return <EmptyList title="No posts, add some friends!" />;

    const PostsComponents = data.map((post) => <Post key={post.id} {...post} />);

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
