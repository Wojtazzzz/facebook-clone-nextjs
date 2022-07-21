import { useOutsideClick } from '@hooks/useOutsideClick';

import { NormalMenu } from '@components/pages/posts/post/inc/settings/menu/NormalMenu';
import { SavedMenu } from '@components/pages/posts/post/inc/settings/menu/SavedMenu';
import { HiddenMenu } from '@components/pages/posts/post/inc/settings/menu/HiddenMenu';

import type { IPostType } from '@utils/types';

interface MenuProps {
    postId: number;
    authorId: number;
    type: IPostType;
    closeMenu: () => void;
}

export const Menu = ({ postId, authorId, type, closeMenu }: MenuProps) => {
    const ref = useOutsideClick(closeMenu);

    return (
        <div
            aria-label="Settings"
            ref={ref}
            className="min-w-[240px] absolute right-0 z-20 bg-dark-300 shadow-md rounded-xl py-3 px-4"
        >
            {type === 'NORMAL' && <NormalMenu authorId={authorId} postId={postId} closeMenu={closeMenu} />}
            {type === 'HIDDEN' && <HiddenMenu postId={postId} closeMenu={closeMenu} />}
            {type === 'SAVED' && <SavedMenu postId={postId} closeMenu={closeMenu} />}
        </div>
    );
};
