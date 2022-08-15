import { usePosts } from '@hooks/usePosts';

import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Option } from '../Option';

interface OwnMenuProps {
    postId: number;
}

export const OwnMenu = ({ postId }: OwnMenuProps) => {
    const { useRemove } = usePosts();
    const { remove, isLoading } = useRemove();

    const handleRemovePost = () => {
        remove(postId);
    };

    return <Option title="Delete" icon={faTrashCan} isActive={isLoading} callback={handleRemovePost} />;
};
