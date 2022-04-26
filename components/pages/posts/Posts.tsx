import { useState } from 'react';

import { CreatePost } from '@components/pages/posts/create/CreatePost';
import { Modal } from '@components/pages/posts/create/modal/Modal';
import { List } from '@components/pages/posts/List';

import type { MouseEvent } from 'react';

export const Posts = () => {
    const [isCreatePostModalActive, setIsCreatePostModalActive] = useState(false);

    const handleOpenModal = () => setIsCreatePostModalActive(true);
    const handleCloseModal = (event: MouseEvent) => {
        event.stopPropagation();
        setIsCreatePostModalActive(false);
    };

    return (
        <div className="max-w-[700px] flex flex-col gap-6 text-black mx-auto p-5">
            <div id="scrollableDiv" className="h-screen flex flex-col gap-4 overflow-auto scrollbar-none">
                <CreatePost handleOpenModal={handleOpenModal} />

                <List />
            </div>

            {isCreatePostModalActive && <Modal handleCloseModal={handleCloseModal} />}
        </div>
    );
};
