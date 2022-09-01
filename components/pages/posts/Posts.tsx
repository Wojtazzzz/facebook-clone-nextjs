import { List } from '@components/pages/posts/list/List';
import { ScrollToTop } from './ScrollToTop';
import { useScroll } from '@hooks/useScroll';
import { CreatePost } from '@components/inc/modals/post/createPost/CreatePost';

export const Posts = () => {
    const { ref, ...rest } = useScroll();

    return (
        <div
            ref={ref}
            id="posts-list"
            className="max-w-[700px] h-screen flex flex-col gap-4 overflow-auto scroll-smooth scrollbar-none text-black mx-auto p-5"
        >
            <CreatePost />
            <List />
            <ScrollToTop {...rest} />
        </div>
    );
};
