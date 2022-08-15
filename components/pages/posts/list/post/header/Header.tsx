import { Author } from '@components/pages/posts/list/post/header/Author';
import { Settings } from '@components/pages/posts/list/post/header/settings/Settings';

import type { IPostType, IUser } from '@utils/types';

interface HeaderProps {
    postId: number;
    author: IUser;
    created_at: string;
    updated_at: string;
    type: IPostType;
}

export const Header = ({ postId, author, created_at, updated_at, type }: HeaderProps) => {
    return (
        <div className="w-full flex justify-between p-4 pb-0">
            <Author author={author} created_at={created_at} updated_at={updated_at} />
            <Settings postId={postId} type={type} />
        </div>
    );
};
