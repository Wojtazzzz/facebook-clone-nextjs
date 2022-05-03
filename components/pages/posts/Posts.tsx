import { useState } from 'react';

import { CreatePost } from '@components/pages/posts/create/CreatePost';
import { Modal } from '@components/pages/posts/create/modal/Modal';
import { List } from '@components/pages/posts/List';

export const Posts = () => {
    const [isCreatePostModalActive, setIsCreatePostModalActive] = useState(false);

    const handleToggleModalActive = (state: boolean) => setIsCreatePostModalActive(state);

    return (
        <div className="max-w-[700px] flex flex-col gap-6 text-black mx-auto p-5">
            <div id="scrollableDiv" className="h-screen flex flex-col gap-4 overflow-auto scroll-smooth scrollbar-none">
                <CreatePost handleOpenModal={() => handleToggleModalActive(true)} />

                <List />
            </div>

            {isCreatePostModalActive && <Modal handleCloseModal={() => handleToggleModalActive(false)} />}
        </div>
    );
};
