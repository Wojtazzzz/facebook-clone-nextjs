import { UserInfo } from '@components/pages/posts/post/header/userInfo/UserInfo';
import { Settings } from '@components/pages/posts/post/header/settings/Settings';

import type { IPostType, IUser } from '@utils/types';

interface HeaderProps {
    postId: number;
    author: IUser;
    created_at: string;
    updated_at: string;
    type: IPostType;
    reloadPosts: () => void;
}

export const Header = ({ postId, author, created_at, updated_at, type, reloadPosts }: HeaderProps) => {
    return (
        <div className="w-full flex justify-between p-4 pb-0">
            <UserInfo author={author} created_at={created_at} updated_at={updated_at} />
            <Settings postId={postId} type={type} reloadPosts={reloadPosts} />
        </div>
    );
};
