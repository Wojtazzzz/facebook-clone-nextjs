import { useAuth } from '@hooks/useAuth';
import { useAppDispatch } from '@hooks/redux';

import { CreatePostLoader } from '@components/pages/posts/create/CreatePostLoader';
import { Avatar } from '@components/inc/Avatar';

import { showModal } from '@redux/slices/CreatePostModalSlice';

export const CreatePost = () => {
    const dispatch = useAppDispatch();
    const { user } = useAuth();

    if (!user) return <CreatePostLoader testid="createPost-loaders" />;

    return (
        <div className="w-full bg-dark-200 rounded-lg p-3">
            <div className="flex gap-3">
                <Avatar size={58} src={user.profile_image} alt={user.name} />

                <button
                    className="w-full bg-dark-100 text-light-100 text-left hover:opacity-70 rounded-3xl cursor-pointer px-3"
                    onClick={() => dispatch(showModal())}
                >
                    What&apos;s on your mind, {user.first_name}?
                </button>
            </div>
        </div>
    );
};
