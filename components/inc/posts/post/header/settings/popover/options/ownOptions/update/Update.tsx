import { faEdit, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Option } from '../../Option';

interface UpdateProps {
    postId: number;
    queryKey: unknown[];
}

export const Update = ({ postId, queryKey }: UpdateProps) => {
    return <Option title="Update" icon={faEdit} isActive={isRemoveLoading} callback={handleRemovePost} />;
};
