import { usePosts } from '@hooks/usePosts';

import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Option } from '@components/pages/posts/post/header/settings/menu/Option';

interface HiddenMenuProps {
    postId: number;
}

export const HiddenMenu = ({ postId }: HiddenMenuProps) => {
    const { useUnhide } = usePosts();
    const { unhide, isLoading } = useUnhide();

    const handleUnhide = () => {
        unhide(postId);
    };

    return <Option title="Unhide" icon={faTrash} isActive={isLoading} callback={handleUnhide} />;
};
