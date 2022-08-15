import { useKey } from '@hooks/useKey';
import type { IPostType } from '@utils/types';
import { FriendMenu } from './friendMenu/FriendMenu';
import { HiddenMenu } from './hiddenMenu/HiddenMenu';
import { OwnMenu } from './ownMenu/OwnMenu';
import { SavedMenu } from './savedMenu/SavedMenu';

interface MenuProps {
    postId: number;
    type: IPostType;
    closeMenu: () => void;
}

export const Menu = ({ postId, type, closeMenu }: MenuProps) => {
    useKey('Escape', closeMenu);

    if (type === 'FRIEND') return <FriendMenu postId={postId} closeMenu={closeMenu} />;
    if (type === 'HIDDEN') return <HiddenMenu postId={postId} />;
    if (type === 'SAVED') return <SavedMenu postId={postId} />;
    return <OwnMenu postId={postId} />;
};
