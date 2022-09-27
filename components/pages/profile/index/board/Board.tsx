import { Posts } from '@components/inc/posts/Posts';
import { usePostsListSwitcher } from './usePostsListSwitcher';
import { Panel } from './panel/Panel';
import { getPostsEndpoint } from '@utils/getPostsEndpoint';
import { BornAt } from './bornAt/BornAt';
import type { IUserProfile } from '@utils/types';
import { getPostsQK } from '@utils/queryKeys';

interface BoardProps {
    user: IUserProfile;
}

export const Board = ({ user }: BoardProps) => {
    const { postsList, changeList } = usePostsListSwitcher();

    const queryKey = getPostsQK({ type: postsList, userId: user.id });
    const endpoint = getPostsEndpoint({ type: postsList, userId: user.id });

    return (
        <div
            data-testid="posts-list"
            className="w-full max-w-[650px] md:max-w-[800px] xl:max-w-[1000px] flex flex-col gap-3 px-1 sm:px-3 md:px-5 lg:px-0"
        >
            <Panel userId={user.id} queryKey={queryKey} changeList={changeList} />
            <Posts queryKey={queryKey} endpoint={endpoint} />
            {postsList === 'own' && <BornAt user={user} />}
        </div>
    );
};
