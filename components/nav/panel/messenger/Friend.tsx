import { useAppDispatch } from '@hooks/redux';

import { SingleItem } from '@components/nav/panel/inc/SingleItem';

import { toggleActive as toggleActiveChat } from '@redux/slices/ChatSlice';
import { toggleActive as toggleActiveMessenger } from '@redux/slices/MessengerSlice';

import type { UserType } from '@ctypes/features/UserType';

interface FriendProps extends UserType {}

export const Friend = ({ id, name, first_name, profile_image, background_image }: FriendProps) => {
    const dispatch = useAppDispatch();

    const handleOpenChat = () => {
        dispatch(toggleActiveMessenger());
        dispatch(toggleActiveChat({ id, name, first_name, profile_image, background_image }));
    };

    return (
        <SingleItem
            ariaLabel="Open chat"
            title={name}
            description="Click to open chat"
            image={profile_image}
            callback={handleOpenChat}
        />
    );
};
