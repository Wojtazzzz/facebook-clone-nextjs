import type { QueryKey } from '@tanstack/react-query';
import type { IPostType, IUser } from '@utils/types';
import { Author } from './Author';
import { Settings } from './settings/Settings';

interface HeaderProps {
    postId: number;
    commenting: boolean;
    author: IUser;
    createdAt: string;
    isEdited: boolean;
    type: IPostType;
    queryKey: QueryKey;
    openUpdateModal: () => void;
}

export const Header = ({
    postId,
    commenting,
    author,
    createdAt,
    isEdited,
    type,
    queryKey,
    openUpdateModal,
}: HeaderProps) => {
    return (
        <div className="w-full flex justify-between pt-2 md:pt-3 pb-0">
            <Author author={author} createdAt={createdAt} isEdited={isEdited} />

            <Settings
                queryKey={queryKey}
                commenting={commenting}
                postId={postId}
                type={type}
                openUpdateModal={openUpdateModal}
            />
        </div>
    );
};
