import { usePaginatedData } from '@hooks/usePaginatedData';

import InfiniteScroll from 'react-infinite-scroll-component';
import { Post } from '@components/pages/posts/post/Post';
import { Loader } from '@components/pages/posts/Loader';
import { ApiError } from '@components/inc/ApiError';
import { EmptyList } from '@components/inc/EmptyList';

import type { IPost } from '@utils/types';

interface PostsProps {
    endpoint: string;
}

export const Posts = ({ endpoint }: PostsProps) => {
    const { data, state, isEmpty, isReachedEnd, reloadData, loadMore } = usePaginatedData<IPost>(endpoint);

    if (state === 'LOADING') return <Loader testId="boardPosts-loading_loader" />;
    if (state === 'ERROR') return <ApiError size="xl" styles="mt-8" />;
    if (isEmpty) return <EmptyList title="No posts, add some friends!" />;

    const PostsComponents = data.map((post) => <Post key={post.id} {...post} reloadPosts={reloadData} />);

    return (
        <div
            data-testid="board-posts"
            id="profile-board-posts"
            className="w-full h-screen flex flex-col gap-4 overflow-auto scroll-smooth scrollbar-none"
        >
            <InfiniteScroll
                dataLength={PostsComponents.length}
                next={loadMore}
                hasMore={!isReachedEnd}
                loader={<Loader testId="boardPosts-fetching_loader" />}
                scrollableTarget="profile-board-posts"
                pullDownToRefreshThreshold={100}
                className="flex flex-col gap-4 mb-12"
            >
                {PostsComponents}
            </InfiniteScroll>
        </div>
    );
};
