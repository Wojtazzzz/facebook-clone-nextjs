import { useAuth } from '@hooks/useAuth';
import { usePosts } from '@hooks/usePosts';

import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Option } from '@components/pages/posts/post/inc/settings/Option';
import { CloseOverlay } from '@components/inc/CloseOverlay';

interface MenuProps {
    postId: number;
    authorId: number;
    closeMenu: () => void;
}

export const Menu = ({ postId, authorId, closeMenu }: MenuProps) => {
    const { user } = useAuth();
    const { isLoading, removePost } = usePosts();

    return (
        <>
            <section
                aria-label="Settings"
                className={`min-w-[240px] absolute right-0 z-20 bg-dark-300 shadow-md rounded-xl ${
                    isLoading ? 'cursor-wait' : ''
                } py-3 px-4`}
            >
                {authorId === user?.id && (
                    <Option title="Delete Post" icon={faTrashCan} callback={() => removePost(postId)} />
                )}
            </section>

            <CloseOverlay testid="settings-closeOverlay" zIndex={10} callback={closeMenu} />
        </>
    );
};
