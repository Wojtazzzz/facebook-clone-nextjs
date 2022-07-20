import { useAppSelector } from '@hooks/redux';

import { FakeForm } from '@components/pages/posts/create/FakeForm';
import { Modal } from '@components/inc/modals/createPost/Modal';
import { List } from '@components/pages/posts/List';

export const Posts = () => {
    return (
        <div className="max-w-[700px] flex flex-col gap-6 text-black mx-auto p-5">
            <div id="posts-list" className="h-screen flex flex-col gap-4 overflow-auto scroll-smooth scrollbar-none">
                <FakeForm />
                <List />
            </div>
        </div>
    );
};
