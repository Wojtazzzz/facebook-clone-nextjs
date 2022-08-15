import { CreatePostModal } from '@components/pages/posts/createPostModal/CreatePostModal';
import { List } from '@components/pages/posts/list/List';
import { ScrollToTop } from './ScrollToTop';
import { useScroll } from '@hooks/useScroll';

export const Posts = () => {
    const { ref, scrollDistance, scroll } = useScroll();

    return (
        <div
            ref={ref}
            id="posts-list"
            className="max-w-[700px] h-screen flex flex-col gap-4 overflow-auto scroll-smooth scrollbar-none text-black mx-auto p-5"
        >
            <CreatePostModal />
            <List />

            <ScrollToTop scrollDistance={scrollDistance} scroll={scroll} />
        </div>
    );
};
