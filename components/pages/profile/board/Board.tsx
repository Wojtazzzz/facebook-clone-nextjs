import { useState } from 'react';
import { useAuth } from '@hooks/useAuth';
import { ListSwitcher } from '@components/pages/profile/board/ListSwitcher';
import { Posts } from '@components/pages/profile/board/Posts';
import { CreatePost } from '@components/inc/modals/post/createPost/CreatePost';

interface BoardProps {
    userId: number;
}

export const Board = ({ userId }: BoardProps) => {
    const [queryKey, setQueryKey] = useState<unknown[]>(['posts', 'own', userId]);
    const [path, setPath] = useState(`/api/users/${userId}/posts`);
    const { user } = useAuth();

    const changeList = (queryKey: unknown[], value: string) => {
        setQueryKey(queryKey);
        setPath(value);
    };

    const isSelfProfile = user && user.id === userId;

    return (
        <div className="w-4/6 flex flex-col gap-4">
            {isSelfProfile && (
                <>
                    <CreatePost />
                    <ListSwitcher userId={userId} changeList={changeList} />
                </>
            )}

            <Posts queryKey={queryKey} path={path} />
        </div>
    );
};
