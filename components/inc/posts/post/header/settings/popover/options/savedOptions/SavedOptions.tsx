import { faTrash } from '@fortawesome/free-solid-svg-icons';
import type { QueryKey } from '@tanstack/react-query';
import { Option } from '../Option';
import { useUnsavePost } from './useUnsavePost';

interface SavedOptionsProps {
    postId: number;
    queryKey: QueryKey;
}

export const SavedOptions = ({ postId, queryKey }: SavedOptionsProps) => {
    const { unsave, isLoading } = useUnsavePost(queryKey);

    const handleUnsave = () => {
        unsave(postId);
    };

    return <Option title="Unsave" icon={faTrash} isLoading={isLoading} callback={handleUnsave} />;
};
