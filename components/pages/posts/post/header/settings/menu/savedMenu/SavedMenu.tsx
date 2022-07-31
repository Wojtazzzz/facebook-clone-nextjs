import { usePosts } from '@hooks/usePosts';

import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Option } from '@components/pages/posts/post/header/settings/menu/Option';

interface SavedMenuProps {
    postId: number;
    closeMenu: () => void;
    reloadPosts: () => void;
}

export const SavedMenu = ({ postId, closeMenu, reloadPosts }: SavedMenuProps) => {
    const { isLoading, unsave } = usePosts();

    const handleUnsave = async () => {
        await unsave(postId);
        closeMenu();
        reloadPosts();
    };

    return <Option title="Unsave" icon={faTrash} isActive={isLoading} callback={handleUnsave} />;
};
