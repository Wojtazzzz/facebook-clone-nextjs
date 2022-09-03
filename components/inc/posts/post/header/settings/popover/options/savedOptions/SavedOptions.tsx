import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Option } from '../Option';
import { useUnsavePost } from './useUnsavePost';

interface SavedOptionsProps {
    postId: number;
    queryKey: unknown[];
}

export const SavedOptions = ({ postId, queryKey }: SavedOptionsProps) => {
    const { unsave, isLoading } = useUnsavePost(queryKey);

    const handleUnsave = () => {
        unsave(postId);
    };

    return <Option title="Unsave" icon={faTrash} isActive={isLoading} callback={handleUnsave} />;
};
