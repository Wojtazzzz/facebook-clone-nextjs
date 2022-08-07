import { FakeForm } from '@components/pages/posts/create/FakeForm';
import { List } from '@components/pages/posts/list/List';

export const Posts = () => {
    return (
        <div
            id="posts-list"
            className="max-w-[700px] h-screen flex flex-col gap-4 overflow-auto scroll-smooth scrollbar-none text-black mx-auto p-5"
        >
            <FakeForm />
            <List />
        </div>
    );
};
