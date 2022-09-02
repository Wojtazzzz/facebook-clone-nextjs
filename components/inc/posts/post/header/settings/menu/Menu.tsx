import { useKey } from '@hooks/useKey';
import type { IPostType } from '@utils/types';
import { FriendMenu } from './friendMenu/FriendMenu';
import { HiddenMenu } from './hiddenMenu/HiddenMenu';
import { OwnMenu } from './ownMenu/OwnMenu';
import { SavedMenu } from './savedMenu/SavedMenu';

interface MenuProps {
    postId: number;
    type: IPostType;
    commenting: boolean;
    closeMenu: () => void;
}

export const Menu = ({ postId, type, commenting, closeMenu }: MenuProps) => {
    useKey('Escape', closeMenu);

    const { is_saved, is_hidden, is_own } = type;

    if (is_saved) return <SavedMenu postId={postId} />;
    if (is_hidden) return <HiddenMenu postId={postId} />;
    if (is_own) return <OwnMenu commenting={commenting} postId={postId} />;
    return <FriendMenu postId={postId} closeMenu={closeMenu} />;
};
