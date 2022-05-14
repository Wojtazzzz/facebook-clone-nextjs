import { Settings } from '@components/pages/posts/post/inc/settings/Settings';
import { UserInfo } from '@components/pages/posts/post/inc/UserInfo';

import type { UserType } from '@ctypes/features/UserType';

interface HeaderProps {
    postId: number;
    author: UserType;
    created_at: string;
    updated_at: string;
}

export const Header = ({ postId, author, created_at, updated_at }: HeaderProps) => {
    return (
        <div className="w-full flex justify-between p-4 pb-0">
            <UserInfo author={author} created_at={created_at} updated_at={updated_at} />
            <Settings postId={postId} />
        </div>
    );
};
