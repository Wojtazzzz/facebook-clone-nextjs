import { faBan, faSave } from '@fortawesome/free-solid-svg-icons';
import { Option } from '../Option';
import { useHide } from './useHide';
import { useSave } from './useSave';

interface FriendMenuProps {
    postId: number;
    closeMenu: () => void;
}

export const FriendMenu = ({ postId, closeMenu }: FriendMenuProps) => {
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
