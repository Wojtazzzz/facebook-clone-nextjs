import { useAuth } from '@hooks/useAuth';
import { usePosts } from '@hooks/usePosts';

import { Option } from '@components/pages/posts/post/inc/settings/menu/Option';
import { faBan, faSave, faTrashCan } from '@fortawesome/free-solid-svg-icons';

interface NormalMenuProps {
    authorId: number;
    postId: number;
    closeMenu: () => void;
}

export const NormalMenu = ({ authorId, postId, closeMenu }: NormalMenuProps) => {
    const { user } = useAuth();
    const { remove, hide, save } = usePosts();

    const handleRemovePost = async () => {
        await remove(postId);
        closeMenu();
    };

    const handleHidePost = async () => {
        await hide(postId);
        closeMenu();
    };

    const handleSavePost = async () => {
        await save(postId);
        closeMenu();
    };

    return (
        <>
            {authorId === user?.id && <Option title="Delete" icon={faTrashCan} callback={handleRemovePost} />}
            {authorId !== user?.id && <Option title="Hide" icon={faBan} callback={handleHidePost} />}
            {authorId !== user?.id && <Option title="Save" icon={faSave} callback={handleSavePost} />}
        </>
    );
};
