import { useAppDispatch } from '@hooks/redux';

import { SingleItem } from '@components/nav/panel/inc/SingleItem';

import { showChat } from '@redux/slices/ChatSlice';
import { toggleActive as toggleActiveMessenger } from '@redux/slices/MessengerSlice';

import type { IUser } from '@utils/types';

interface FriendProps {
    friend: IUser;
}

export const Friend = ({ friend }: FriendProps) => {
    const dispatch = useAppDispatch();

    const handleOpenChat = () => {
        dispatch(toggleActiveMessenger(false));
        dispatch(showChat(friend));
    };

    return (
        <SingleItem
            title={friend.name}
            message="Click to open chat"
            image={friend.profile_image}
            callback={handleOpenChat}
        />
    );
};
