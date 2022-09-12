import { Posts } from '@components/inc/posts/Posts';
import { usePostsListSwitcher } from './usePostsListSwitcher';
import { Panel } from './panel/Panel';

interface BoardProps {
    userId: number;
}

export const Board = ({ userId }: BoardProps) => {
    const { postsList, changeList } = usePostsListSwitcher();

    return (
        <div
            data-testid="posts-list"
            id="posts-list"
            className="w-4/6 h-screen flex flex-col gap-4 overflow-auto scroll-smooth scrollbar-none"
        >
            <Panel userId={userId} postsList={postsList} changeList={changeList} />
            <Posts userId={userId} postsList={postsList} />
        </div>
    );
};
