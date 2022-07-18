import { useAppDispatch } from '@hooks/redux';

import { Avatar } from '@components/inc/Avatar';

import { memo } from 'react';
import { showChat } from '@redux/slices/ChatSlice';

import type { IContact } from '@utils/types';

interface ContactProps extends IContact {}

export const Contact = memo<ContactProps>(({ id, name, profile_image }) => {
    const dispatch = useAppDispatch();

    // const handleOpenChat = () => dispatch(showChat(contact));
    const handleOpenChat = () => console.log('Action...');

    return (
        <button
            aria-label="Show chat with user"
            className="w-full flex items-center gap-3 hover:bg-dark-100 rounded-lg transition-colors cursor-pointer p-2"
            onClick={handleOpenChat}
        >
            <Avatar size={36} src={profile_image} alt="" />
            <span className="text-light-200 font-medium leading-5 m-0">{name}</span>
        </button>
    );
});

Contact.displayName = 'Contact';
