import { useAuth } from '@hooks/useAuth';
import { usePosts } from '@hooks/usePosts';
import { useOutsideClick } from '@hooks/useOutsideClick';

import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Option } from '@components/pages/posts/post/inc/settings/Option';

interface MenuProps {
    postId: number;
    authorId: number;
    closeMenu: () => void;
}

export const Menu = ({ postId, authorId, closeMenu }: MenuProps) => {
    const { user } = useAuth();
    const { isLoading, removePost } = usePosts();
    const ref = useOutsideClick(closeMenu);

    const handleRemovePost = () => removePost(postId);

    return (
        <div
            aria-label="Settings"
            ref={ref}
            className={`min-w-[240px] absolute right-0 z-20 bg-dark-300 shadow-md rounded-xl ${
                isLoading ? 'cursor-wait' : ''
            } py-3 px-4`}
        >
            {authorId === user?.id && <Option title="Delete Post" icon={faTrashCan} callback={handleRemovePost} />}
        </div>
    );
};
