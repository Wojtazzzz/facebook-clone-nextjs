import { useBoard } from '@hooks/useBoard';

import { CreatePost } from '@components/pages/profile/board/CreatePost';
import { ListSwitcher } from '@components/pages/profile/board/ListSwitcher';
import { Posts } from '@components/pages/profile/board/Posts';

export const Board = () => {
    const { changePostsList, ...rest } = useBoard();

    return (
        <div className="w-4/6 flex flex-col gap-4">
            <CreatePost />
            <ListSwitcher changePostsList={changePostsList} />
            <Posts {...rest} />
        </div>
    );
};
