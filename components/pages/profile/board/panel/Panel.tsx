import { CreatePost } from '@components/inc/modals/post/create/createPost/CreatePost';
import { useAuth } from '@hooks/useAuth';
import type { ChangeEvent } from 'react';
import { ListSwitcher } from './ListSwitcher';

interface PanelProps {
    userId: number;
    queryKey: unknown[];
    changeList: (event: ChangeEvent<HTMLSelectElement>) => void;
}

export const Panel = ({ userId, queryKey, changeList }: PanelProps) => {
    const { user } = useAuth();

    const isSelfProfile = user?.id === userId;

    if (!isSelfProfile) return null;

    return (
        <>
            <CreatePost queryKey={queryKey} />
            <ListSwitcher changeList={changeList} />
        </>
    );
};
