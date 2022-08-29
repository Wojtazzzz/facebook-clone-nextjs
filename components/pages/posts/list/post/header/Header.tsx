import { Author } from '@components/pages/posts/list/post/header/Author';
import { Settings } from '@components/pages/posts/list/post/header/settings/Settings';

import type { IPostType, IUser } from '@utils/types';

interface HeaderProps {
    postId: number;
    commenting: boolean;
    author: IUser;
    createdAt: string;
    isEdited: boolean;
    type: IPostType;
}

export const Header = ({ postId, commenting, author, createdAt, isEdited, type }: HeaderProps) => {
    return (
        <div className="w-full flex justify-between p-4 pb-0">
            <Author author={author} createdAt={createdAt} isEdited={isEdited} />
            <Settings commenting={commenting} postId={postId} type={type} />
        </div>
    );
};
