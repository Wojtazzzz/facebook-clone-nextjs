import { CreatePost } from '@components/inc/modals/post/createPost/CreatePost';
import { useAuth } from '@hooks/useAuth';
import type { ChangeEvent } from 'react';
import { ListSwitcher } from '../ListSwitcher';

interface PanelProps {
    userId: number;
    changeList: (event: ChangeEvent<HTMLSelectElement>) => void;
}

export const Panel = ({ userId, changeList }: PanelProps) => {
    const { user } = useAuth();

    const isSelfProfile = user?.id === userId;

    if (!isSelfProfile) return null;

    return (
        <>
            <CreatePost />
            <ListSwitcher changeList={changeList} />
        </>
    );
};
