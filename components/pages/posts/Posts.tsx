import { useAppSelector } from '@hooks/redux';

import { CreatePost } from '@components/pages/posts/create/CreatePost';
import { CreatePostModal } from '@components/pages/posts/create/modal/CreatePostModal';
import { List } from '@components/pages/posts/List';

export const Posts = () => {
    const isCreatePostModalActive = useAppSelector((store) => store.createPostModal.isModalActive);

    return (
        <div className="max-w-[700px] flex flex-col gap-6 text-black mx-auto p-5">
            <div id="scrollableDiv" className="h-screen flex flex-col gap-4 overflow-auto scroll-smooth scrollbar-none">
                <CreatePost />
                <List />
            </div>

            {isCreatePostModalActive && <CreatePostModal />}
        </div>
    );
};
