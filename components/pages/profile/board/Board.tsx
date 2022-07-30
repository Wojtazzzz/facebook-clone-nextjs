import { useState } from 'react';
import { useAuth } from '@hooks/useAuth';

import { CreatePost } from '@components/pages/profile/board/CreatePost';
import { ListSwitcher } from '@components/pages/profile/board/ListSwitcher';
import { Posts } from '@components/pages/profile/board/Posts';

interface BoardProps {
    userId: number;
}

export const Board = ({ userId }: BoardProps) => {
    const [endpoint, setEndpoint] = useState(`/api/users/${userId}/posts`);
    const { user } = useAuth();

    const changeList = (value: string) => {
        setEndpoint(value);
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

            <Posts endpoint={endpoint} />
        </div>
    );
};
