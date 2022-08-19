import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Option } from '../Option';
import { useRemove } from './useRemove';

interface OwnMenuProps {
    postId: number;
}

export const OwnMenu = ({ postId }: OwnMenuProps) => {
    const { remove, isLoading } = useRemove();

    const handleRemovePost = () => {
        remove(postId);
    };

    return <Option title="Delete" icon={faTrashCan} isActive={isLoading} callback={handleRemovePost} />;
};
