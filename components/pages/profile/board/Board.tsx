import { Posts } from '@components/inc/posts/Posts';
import { usePostsListSwitcher } from './usePostsListSwitcher';
import { Panel } from './panel/Panel';
import { getPostsQueryKey } from '@utils/getPostsQueryKey';
import { getPostsEndpoint } from '@utils/getPostsEndpoint';
import { BornAt } from './bornAt/BornAt';
import type { IUserProfile } from '@utils/types';

interface BoardProps {
    user: IUserProfile;
}

export const Board = ({ user }: BoardProps) => {
    const { postsList, changeList } = usePostsListSwitcher();

    const queryKey = getPostsQueryKey(postsList, user.id);
    const endpoint = getPostsEndpoint(postsList, user.id);

    return (
        <div
            data-testid="posts-list"
<<<<<<< HEAD
            className="w-full max-w-[650px] md:max-w-[800px] xl:max-w-[1000px] flex flex-col gap-4 px-1 sm:px-3 md:px-5"
=======
            className="w-full max-w-[650px] md:max-w-[800px] xl:max-w-[1000px] flex flex-col gap-4 scroll-smooth"
>>>>>>> cdcf724f534c6ae324e08953970f2e80b11f7e62
        >
            <Panel userId={user.id} queryKey={queryKey} changeList={changeList} />
            <Posts queryKey={queryKey} endpoint={endpoint} />
            {postsList === 'own' && <BornAt user={user} />}
        </div>
    );
};
