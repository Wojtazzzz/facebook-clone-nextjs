import { usePosts } from '@hooks/usePosts';

import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Option } from '../Option';

interface SavedMenuProps {
    postId: number;
}

export const SavedMenu = ({ postId }: SavedMenuProps) => {
    const { useUnsave } = usePosts();
    const { unsave, isLoading } = useUnsave();

    const handleUnsave = () => {
        unsave(postId);
    };

    return <Option title="Unsave" icon={faTrash} isActive={isLoading} callback={handleUnsave} />;
};
