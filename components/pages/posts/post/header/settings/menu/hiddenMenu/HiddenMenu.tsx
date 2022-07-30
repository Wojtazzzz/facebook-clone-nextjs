import { usePosts } from '@hooks/usePosts';

import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Option } from '@components/pages/posts/post/header/settings/menu/Option';

interface HiddenMenuProps {
    postId: number;
    closeMenu: () => void;
    reloadPosts: () => void;
}

export const HiddenMenu = ({ postId, closeMenu, reloadPosts }: HiddenMenuProps) => {
    const { unhide } = usePosts();

    const handleUnhide = async () => {
        await unhide(postId);
        reloadPosts();
        closeMenu();
    };

    return <Option title="Unhide" icon={faTrash} callback={handleUnhide} />;
};
