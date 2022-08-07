import { Avatar } from '@components/inc/Avatar';
import { useAppDispatch } from '@hooks/redux';

import { openChat } from '@redux/slices/ChatSlice';
import { toggleActive as toggleActiveMessenger } from '@redux/slices/MessengerSlice';

import type { IUser } from '@utils/types';

interface ConversationProps {
    friend: IUser;
}

export const Conversation = ({ friend }: ConversationProps) => {
    const dispatch = useAppDispatch();

    const handleOpenChat = () => {
        dispatch(toggleActiveMessenger(false));
        dispatch(openChat(friend));
    };

    return (
        <button
            className="w-full h-[72px] flex gap-3 hover:bg-dark-100 transition-colors rounded-lg cursor-pointer p-2"
            onClick={handleOpenChat}
        >
            <Avatar src={friend.profile_image} size={56} alt="" />

            <div className="flex flex-col text-left">
                <span className="text-light-200">{friend.name}</span>
                <span className="text-sm text-light-100">Click to open chat</span>
            </div>
        </button>
    );
};
