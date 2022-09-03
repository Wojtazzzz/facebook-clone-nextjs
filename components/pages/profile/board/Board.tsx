import { Posts } from '@components/inc/posts/Posts';
import { usePostsListSwitcher } from './usePostsListSwitcher';
import { Panel } from './panel/Panel';

interface BoardProps {
    userId: number;
}

export const Board = ({ userId }: BoardProps) => {
    const { postsList, changeList } = usePostsListSwitcher();

    console.log('USERID: ', userId); // userId się zmienia
    console.log('QUERYKEY: ', queryKey); // queryKey się nie zmienia

    return (
        <div
            data-testid="posts-list"
            id="posts-list"
            className="w-4/6 h-screen flex flex-col gap-4 overflow-auto scroll-smooth scrollbar-none"
        >
            <Panel userId={userId} changeList={changeList} />
            <Posts postsList={postsList} userId={userId} />
        </div>
    );
};
