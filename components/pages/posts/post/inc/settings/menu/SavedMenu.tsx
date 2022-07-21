import { usePosts } from '@hooks/usePosts';

import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Option } from '@components/pages/posts/post/inc/settings/menu/Option';

interface SavedMenuProps {
    postId: number;
    closeMenu: () => void;
}

export const SavedMenu = ({ postId, closeMenu }: SavedMenuProps) => {
    const { unsave } = usePosts();

    const handleUnsave = async () => {
        await unsave(postId);
        closeMenu();
    };
    return (
        <>
            <Option title="Unsave" icon={faTrash} callback={handleUnsave} />
        </>
    );
};
