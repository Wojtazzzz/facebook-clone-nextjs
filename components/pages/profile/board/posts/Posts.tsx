import { useBoard } from '@hooks/useBoard';

import InfiniteScroll from 'react-infinite-scroll-component';
import { ListSwitcher } from '@components/pages/profile/board/posts/ListSwitcher';
import { Post } from '@components/pages/posts/post/Post';
import { Loader } from '@components/pages/posts/Loader';
import { ApiError } from '@components/inc/ApiError';
import { EmptyList } from '@components/inc/EmptyList';

export const Posts = () => {
    const { data, state, isEmpty, isReachedEnd, loadMore, changePostsList } = useBoard();

    if (state === 'LOADING') return <Loader testId="boardPosts-loading_loader" />;
    if (state === 'ERROR') return <ApiError size="xl" styles="mt-8" />;
    if (isEmpty) return <EmptyList title="No posts, add some friends!" />;

    const PostsComponents = data.map((post) => <Post key={post.id} {...post} />);

    return (
        <>
            <ListSwitcher changePostsList={changePostsList} />

            <div
                id="profile-board-posts"
                className="w-full flex flex-col gap-4 overflow-auto scroll-smooth scrollbar-none"
            >
                <InfiniteScroll
                    dataLength={PostsComponents.length}
                    next={loadMore}
                    hasMore={!isReachedEnd}
                    loader={<Loader testId="boardPosts-fetching_loader" />}
                    scrollableTarget="posts-list"
                    pullDownToRefreshThreshold={100}
                    className="flex flex-col gap-4 mb-12"
                >
                    {PostsComponents}
                </InfiniteScroll>
            </div>
        </>
    );
};
