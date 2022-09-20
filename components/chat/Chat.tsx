import { useBroadcasting } from '@components/chat/useBroadcasting';
import { Header } from '@components/chat/header/Header';
import type { IChatFriend } from '@utils/types';
import { Conversation } from './conversation/Conversation';
import { CreateMessage } from './createMessage/CreateMessage';

interface ChatProps {
    friend: IChatFriend;
}

export const Chat = ({ friend }: ChatProps) => {
    useBroadcasting(friend);

    return (
        <div
            data-testid="chat"
            className="w-[300px] h-[420px] max-h-[420px] flex flex-col justify-between bg-dark-200 fixed bottom-0 right-2 md:right-20 z-40 rounded-t-lg shadow-md"
        >
            <Header name={friend.name} profileImage={friend.profile_image} />
            <Conversation friend={friend} />
            <CreateMessage />
        </div>
    );
};
