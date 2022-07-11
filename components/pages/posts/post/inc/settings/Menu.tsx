import { useAuth } from '@hooks/useAuth';
import { usePosts } from '@hooks/usePosts';
import { useOutsideClick } from '@hooks/useOutsideClick';

import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Option } from '@components/pages/posts/post/inc/settings/Option';

import { clsx } from 'clsx';

interface MenuProps {
    postId: number;
    authorId: number;
    closeMenu: () => void;
}

export const Menu = ({ postId, authorId, closeMenu }: MenuProps) => {
    const { user } = useAuth();
    const { isLoading, removePost } = usePosts();
    const ref = useOutsideClick(closeMenu);

    const handleRemovePost = async () => {
        await removePost(postId);
        closeMenu();
    };

    return (
        <div
            aria-label="Settings"
            ref={ref}
            className={clsx(
                'min-w-[240px] absolute right-0 z-20 bg-dark-300 shadow-md rounded-xl py-3 px-4',
                isLoading && 'cursor-wait'
            )}
        >
            {authorId === user?.id && <Option title="Delete post" icon={faTrashCan} callback={handleRemovePost} />}
        </div>
    );
};
