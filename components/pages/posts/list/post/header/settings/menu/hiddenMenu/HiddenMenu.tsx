import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Option } from '../Option';
import { useUnhide } from './useUnhide';

interface HiddenMenuProps {
    postId: number;
}

export const HiddenMenu = ({ postId }: HiddenMenuProps) => {
    const { unhide, isLoading } = useUnhide();

    const handleUnhide = () => {
        unhide(postId);
    };

    return <Option title="Unhide" icon={faTrash} isActive={isLoading} callback={handleUnhide} />;
};
