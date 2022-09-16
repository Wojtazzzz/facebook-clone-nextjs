import { ScrollToTop } from './ScrollToTop';
import { useScroll } from '@hooks/useScroll';
import { CreatePost } from '@components/inc/modals/post/create/createPost/CreatePost';
import { Posts as PostsList } from '@components/inc/posts/Posts';
import { useAuth } from '@hooks/useAuth';
import { getPostsQueryKey } from '@utils/getPostsQueryKey';
import { getPostsEndpoint } from '@utils/getPostsEndpoint';

export const Posts = () => {
    const { ref, scroll, scrollDistance } = useScroll();
    const { user } = useAuth();

    const queryKey = getPostsQueryKey('all', user?.id);
    const endpoint = getPostsEndpoint('all', user?.id);

    return (
        <div
            ref={ref}
            id="posts-list"
            className="max-w-[700px] h-screen flex flex-col gap-4 overflow-auto scroll-smooth scrollbar-none text-black mx-auto p-3 md:p-5"
        >
            <CreatePost queryKey={queryKey} />
            <PostsList queryKey={queryKey} endpoint={endpoint} />
            <ScrollToTop scroll={scroll} scrollDistance={scrollDistance} />
        </div>
    );
};
