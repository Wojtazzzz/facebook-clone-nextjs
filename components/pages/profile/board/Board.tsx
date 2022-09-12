import { Posts } from '@components/inc/posts/Posts';
import { usePostsListSwitcher } from './usePostsListSwitcher';
import { Panel } from './panel/Panel';
import { getPostsQueryKey } from '@utils/getPostsQueryKey';
import { getPostsEndpoint } from '@utils/getPostsEndpoint';

interface BoardProps {
    userId: number;
}

export const Board = ({ userId }: BoardProps) => {
    const { postsList, changeList } = usePostsListSwitcher();

    const queryKey = getPostsQueryKey(postsList, userId);
    const endpoint = getPostsEndpoint(postsList, userId);

    return (
        <div
            data-testid="posts-list"
            id="posts-list"
            className="w-4/6 h-screen flex flex-col gap-4 overflow-auto scroll-smooth scrollbar-none"
        >
            <Panel userId={userId} queryKey={queryKey} changeList={changeList} />
            <Posts queryKey={queryKey} endpoint={endpoint} />
        </div>
    );
};
