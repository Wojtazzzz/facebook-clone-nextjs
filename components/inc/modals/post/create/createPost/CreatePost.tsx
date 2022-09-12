import { useAuth } from '@hooks/useAuth';
import { Loader } from './Loader';
import { Avatar } from '@components/inc/Avatar';
import { useCreatePostModal } from '../useCreatePostModal';
import { Modal } from '../modal/Modal';
import type { IPostList } from '@utils/types';
import { getPostsQueryKey } from '@utils/getPostsQueryKey';

interface CreatePostProps {
    postList: IPostList;
}

export const CreatePost = ({ postList }: CreatePostProps) => {
    const { user } = useAuth();
    const { open } = useCreatePostModal();

    if (!user) return <Loader />;

    const { id, name, first_name, profile_image } = user;

    const queryKey = getPostsQueryKey(postList, id);

    return (
        <>
            <div className="w-full flex gap-3 bg-dark-200 rounded-lg p-3">
                <Avatar size={58} src={profile_image} alt={name} />

                <button
                    aria-label="Create a post"
                    className="w-full bg-dark-100 text-light-100 text-left hover:opacity-70 rounded-3xl cursor-pointer px-3"
                    onClick={open}
                >
                    What&apos;s on your mind, {first_name}?
                </button>
            </div>

            <Modal queryKey={queryKey} />
        </>
    );
};
