import { useKey } from '@hooks/useKey';

import { OwnMenu } from '@components/pages/posts/post/header/settings/menu/ownMenu/OwnMenu';
import { SavedMenu } from '@components/pages/posts/post/header/settings/menu/savedMenu/SavedMenu';
import { HiddenMenu } from '@components/pages/posts/post/header/settings/menu/hiddenMenu/HiddenMenu';
import { FriendMenu } from '@components/pages/posts/post/header/settings/menu/friendMenu/FriendMenu';

import type { IPostType } from '@utils/types';

interface MenuProps {
    postId: number;
    type: IPostType;
    closeMenu: () => void;
    reloadPosts: () => void;
}

export const Menu = ({ postId, type, closeMenu, reloadPosts }: MenuProps) => {
    useKey('Escape', closeMenu);

    if (type === 'FRIEND') return <FriendMenu postId={postId} closeMenu={closeMenu} reloadPosts={reloadPosts} />;
    if (type === 'HIDDEN') return <HiddenMenu postId={postId} closeMenu={closeMenu} reloadPosts={reloadPosts} />;
    if (type === 'SAVED') return <SavedMenu postId={postId} closeMenu={closeMenu} reloadPosts={reloadPosts} />;
    return <OwnMenu postId={postId} closeMenu={closeMenu} reloadPosts={reloadPosts} />;
};
