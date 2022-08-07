import { usePosts } from '@hooks/usePosts';

import { faBan, faSave } from '@fortawesome/free-solid-svg-icons';
import { Option } from '@components/pages/posts/post/header/settings/menu/Option';

interface FriendMenuProps {
    postId: number;
    closeMenu: () => void;
}

export const FriendMenu = ({ postId, closeMenu }: FriendMenuProps) => {
    const { useHide, useSave } = usePosts();
    const { hide, isLoading: isHideLoading } = useHide();
    const { save, isLoading: isSaveLoading } = useSave();

    const handleHidePost = () => {
        hide(postId);
    };

    const handleSavePost = () => {
        save(postId, () => {
            closeMenu();
        });
    };

    return (
        <>
            <Option title="Hide" icon={faBan} isActive={isHideLoading} callback={handleHidePost} />
            <Option title="Save" icon={faSave} isActive={isSaveLoading} callback={handleSavePost} />
        </>
    );
};
