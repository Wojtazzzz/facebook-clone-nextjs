import { faBan, faSave } from '@fortawesome/free-solid-svg-icons';
import { Option } from '../Option';
import { useHidePost } from './useHidePost';
import { useSavePost } from './useSavePost';

interface FriendOptionsProps {
    postId: number;
    closeMenu: () => void;
}

export const FriendOptions = ({ postId, closeMenu }: FriendOptionsProps) => {
    const { hide, isLoading: isHideLoading } = useHidePost();
    const { save, isLoading: isSaveLoading } = useSavePost();

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
