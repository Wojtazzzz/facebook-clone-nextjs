import { memo } from 'react';
import { useAppDispatch } from '@hooks/redux';

import { Avatar } from '@components/inc/Avatar';

import { showChat } from '@redux/slices/ChatSlice';

import type { UserType } from '@ctypes/features/UserType';

interface ContactProps {
    friend: UserType;
}

export const Contact = memo<ContactProps>(({ friend }) => {
    const dispatch = useAppDispatch();

    const handleOpenChat = () => dispatch(showChat(friend));

    return (
        <div
            className="w-full flex items-center gap-3 hover:bg-dark-100 rounded-lg transition-colors cursor-pointer p-2"
            onClick={handleOpenChat}
        >
            <Avatar size={36} src={friend.profile_image} alt="" />
            <span className="text-light-200 font-medium leading-5 m-0">{friend.name}</span>
        </div>
    );
});

Contact.displayName = 'Contact';
