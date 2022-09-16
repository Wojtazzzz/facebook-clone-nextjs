import { useDispatch } from 'react-redux';
import { Avatar } from '@components/inc/Avatar';
import { openChat } from '@redux/slices/ChatSlice';
import type { IContact } from '@utils/types';

interface ContactProps extends IContact {}

export const Contact = (contact: ContactProps) => {
    const dispatch = useDispatch();
    const handleOpenChat = () => dispatch(openChat(contact));

    const { name, profile_image } = contact;

    return (
        <button
            aria-label={`Open chat with ${name}`}
            className="w-full flex items-center gap-3 hover:bg-dark-100 rounded-lg transition-colors cursor-pointer p-2"
            onClick={handleOpenChat}
        >
            <Avatar src={profile_image} alt="" styles="w-[36px] h-[36px]" />

            <span className="text-light-200 font-medium leading-5">{name}</span>
        </button>
    );
};
