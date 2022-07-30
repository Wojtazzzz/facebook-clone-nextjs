import { usePosts } from '@hooks/usePosts';

import { faBan, faSave } from '@fortawesome/free-solid-svg-icons';
import { Option } from '@components/pages/posts/post/header/settings/menu/Option';

interface FriendMenuProps {
    postId: number;
    closeMenu: () => void;
    reloadPosts: () => void;
}

export const FriendMenu = ({ postId, closeMenu, reloadPosts }: FriendMenuProps) => {
    const { hide, save } = usePosts();

    const handleHidePost = async () => {
        await hide(postId);
        reloadPosts();
        closeMenu();
    };

    const handleSavePost = async () => {
        await save(postId);
        reloadPosts();
        closeMenu();
    };

    return (
        <>
            <Option title="Hide" icon={faBan} callback={handleHidePost} />
            <Option title="Save" icon={faSave} callback={handleSavePost} />
        </>
    );
};
