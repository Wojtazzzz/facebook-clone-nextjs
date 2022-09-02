import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Option } from '../Option';
import { useUnsavePost } from './useUnsavePost';

interface SavedOptionsProps {
    postId: number;
}

export const SavedOptions = ({ postId }: SavedOptionsProps) => {
    const { unsave, isLoading } = useUnsavePost();

    const handleUnsave = () => {
        unsave(postId);
    };

    return <Option title="Unsave" icon={faTrash} isActive={isLoading} callback={handleUnsave} />;
};
