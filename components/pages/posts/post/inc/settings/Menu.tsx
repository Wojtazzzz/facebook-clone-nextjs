import { usePosts } from '@hooks/usePosts';

import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Option } from '@components/pages/posts/post/inc/settings/Option';

interface MenuProps {
    postId: number;
    closeMenu: () => void;
}

export const Menu = ({ postId, closeMenu }: MenuProps) => {
    const { isLoading, removePost } = usePosts(postId);

    return (
        <>
            <section
                aria-label="Settings"
                className={`min-w-[240px] absolute right-0 z-20 bg-dark-300 shadow-md rounded-xl ${
                    isLoading ? 'cursor-wait' : ''
                } py-3 px-4`}
            >
                <Option title="Delete Post" icon={faTrashCan} callback={removePost} />
            </section>

            <div
                data-testid="settings-closeOverlay"
                className="w-full h-screen fixed top-0 left-0 z-10"
                onClick={closeMenu}
            ></div>
        </>
    );
};
