import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Option } from '../../Option';
import { useRemovePost } from './useRemovePost';

interface DeleteProps {
    postId: number;
    queryKey: unknown[];
}

export const Delete = ({ postId, queryKey }: DeleteProps) => {
    const { remove, isLoading: isRemoveLoading } = useRemovePost(queryKey);

    const handleRemovePost = () => remove(postId);

    return <Option title="Delete" icon={faTrashCan} isActive={isRemoveLoading} callback={handleRemovePost} />;
};
