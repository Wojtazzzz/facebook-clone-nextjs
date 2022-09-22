import { faBan, faSave } from '@fortawesome/free-solid-svg-icons';
import { Option } from '../Option';
import { useHidePost } from './useHidePost';
import { useSavePost } from './useSavePost';
import type { QueryKey } from '@tanstack/react-query';

interface FriendOptionsProps {
    postId: number;
    queryKey: QueryKey;
    closeMenu: () => void;
}

export const FriendOptions = ({ postId, queryKey, closeMenu }: FriendOptionsProps) => {
    const { hide, isLoading: isHideLoading } = useHidePost(queryKey);
    const { save, isLoading: isSaveLoading } = useSavePost(queryKey);

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
