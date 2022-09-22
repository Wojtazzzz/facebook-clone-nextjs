import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Option } from '../Option';
import { useUnhidePost } from './useUnhidePost';
import type { QueryKey } from '@tanstack/react-query';

interface HiddenOptionsProps {
    postId: number;
    queryKey: QueryKey;
}

export const HiddenOptions = ({ postId, queryKey }: HiddenOptionsProps) => {
    const { unhide, isLoading } = useUnhidePost(queryKey);

    const handleUnhide = () => {
        unhide(postId);
    };

    return <Option title="Unhide" icon={faTrash} isActive={isLoading} callback={handleUnhide} />;
};
