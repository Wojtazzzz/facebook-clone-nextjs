import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Option } from '../../Option';
import { useRemovePost } from './useRemovePost';
import type { QueryKey } from '@tanstack/react-query';

interface DeleteProps {
    postId: number;
    queryKey: QueryKey;
}

export const Delete = ({ postId, queryKey }: DeleteProps) => {
    const { remove, isLoading: isRemoveLoading } = useRemovePost(queryKey);

    const handleRemovePost = () => remove(postId);

    return <Option title="Delete" icon={faTrashCan} isLoading={isRemoveLoading} callback={handleRemovePost} />;
};
