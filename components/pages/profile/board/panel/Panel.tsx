import { CreatePost } from '@components/inc/modals/post/create/createPost/CreatePost';
import { useAuth } from '@hooks/useAuth';
import type { IPostList } from '@utils/types';
import type { ChangeEvent } from 'react';
import { ListSwitcher } from './ListSwitcher';

interface PanelProps {
    userId: number;
    postsList: IPostList;
    changeList: (event: ChangeEvent<HTMLSelectElement>) => void;
}

export const Panel = ({ userId, postsList, changeList }: PanelProps) => {
    const { user } = useAuth();

    const isSelfProfile = user?.id === userId;

    if (!isSelfProfile) return null;

    return (
        <>
            <CreatePost postList={postsList} />
            <ListSwitcher changeList={changeList} />
        </>
    );
};
