import { useAuth } from '@hooks/useAuth';
import { useAppDispatch } from '@hooks/redux';

import { FakeFormLoader } from '@components/pages/posts/create/FakeFormLoader';
import { Avatar } from '@components/inc/Avatar';

import { openModal } from '@redux/slices/CreatePostModalSlice';

export const FakeForm = () => {
    const dispatch = useAppDispatch();
    const { user } = useAuth();

    const handleOpenModal = () => dispatch(openModal());

    if (!user) return <FakeFormLoader testid="fakeForm-loaders" />;

    const { name, first_name, profile_image } = user;

    return (
        <div className="w-full bg-dark-200 rounded-lg p-3">
            <div className="flex gap-3">
                <Avatar size={58} src={profile_image} alt={name} />

                <button
                    aria-label="Show create post modal"
                    className="w-full bg-dark-100 text-light-100 text-left hover:opacity-70 rounded-3xl cursor-pointer px-3"
                    onClick={handleOpenModal}
                >
                    What&apos;s on your mind, {first_name}?
                </button>
            </div>
        </div>
    );
};
