import { usePosts } from '@hooks/usePosts';

import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Option } from '@components/pages/posts/post/inc/settings/menu/Option';

interface HiddenMenuProps {
    postId: number;
    closeMenu: () => void;
}

export const HiddenMenu = ({ postId, closeMenu }: HiddenMenuProps) => {
    const { unhide } = usePosts();

    const handleUnhide = async () => {
        await unhide(postId);
        closeMenu();
    };

    return (
        <>
            <Option title="Unhide" icon={faTrash} callback={handleUnhide} />
        </>
    );
};
