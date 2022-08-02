import { useChat } from '@hooks/useChat';

import { Avatar } from '@components/inc/Avatar';

import type { IContact } from '@utils/types';
import { useDispatch } from 'react-redux';
import { openChat } from '@redux/slices/ChatSlice';

interface ContactProps extends IContact {}

export const Contact = (contact: ContactProps) => {
    const dispatch = useDispatch();
    const handleOpenChat = () => dispatch(openChat(contact));

    const { name, profile_image } = contact;

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
};
