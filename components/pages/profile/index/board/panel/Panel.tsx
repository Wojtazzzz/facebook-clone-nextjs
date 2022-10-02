import { useAuth } from '@hooks/useAuth';
import type { ChangeEvent } from 'react';
import { ListSwitcher } from './ListSwitcher';
import type { QueryKey } from '@tanstack/react-query';
import { CreatePost } from '@components/inc/createPost/CreatePost';

interface PanelProps {
    userId: number;
    queryKey: QueryKey;
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
