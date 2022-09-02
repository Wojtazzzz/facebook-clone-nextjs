import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Option } from '../Option';
import { useUnhidePost } from './useUnhidePost';

interface HiddenOptionsProps {
    postId: number;
}

export const HiddenOptions = ({ postId }: HiddenOptionsProps) => {
    const { unhide, isLoading } = useUnhidePost();

    const handleUnhide = () => {
        unhide(postId);
    };

    return <Option title="Unhide" icon={faTrash} isActive={isLoading} callback={handleUnhide} />;
};
