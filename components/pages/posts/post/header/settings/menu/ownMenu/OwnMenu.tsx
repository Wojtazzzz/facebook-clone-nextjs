import { usePosts } from '@hooks/usePosts';

import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Option } from '@components/pages/posts/post/header/settings/menu/Option';

interface OwnMenuProps {
    postId: number;
    closeMenu: () => void;
    reloadPosts: () => void;
}

export const OwnMenu = ({ postId, closeMenu, reloadPosts }: OwnMenuProps) => {
    const { remove } = usePosts();

    const handleRemovePost = async () => {
        await remove(postId);
        closeMenu();
        reloadPosts();
    };

    return <Option title="Delete" icon={faTrashCan} callback={handleRemovePost} />;
};
