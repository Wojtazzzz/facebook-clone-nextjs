import { Avatar } from '@components/inc/Avatar';
import { useChat } from '@hooks/useChat';
import type { IUser } from '@utils/types';

interface ConversationProps {
    friend: IUser;
    close: () => void;
}

export const Conversation = ({ friend, close }: ConversationProps) => {
    const { openChat } = useChat();

    const handleOpenChat = () => {
        close();
        openChat(friend);
    };

    return (
        <button
            aria-label="Click to open conversation"
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
