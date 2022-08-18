import { useEffect } from 'react';
import { useAuth } from '@hooks/useAuth';
import { useBroadcast } from '@hooks/useBroadcast';
import { useChat } from '@hooks/useChat';
import { Header } from '@components/chat/header/Header';
import { Panel } from '@components/chat/panel/Panel';
import type { IChatFriend } from '@utils/types';
import { Conversation } from './conversation/Conversation';

interface ChatProps {
    friend: IChatFriend;
}

export const Chat = ({ friend }: ChatProps) => {
    const { user } = useAuth();
    const { invalidate } = useChat();
    const { startListen, stopListen } = useBroadcast();

    useEffect(() => {
        if (!user) return;

        startListen(`messages.${user.id}.${friend.id}`, 'ChatMessageSent', () => invalidate(friend.id));

        return () => stopListen(`messages.${user.id}.${friend.id}`, 'ChatMessageSent');
    }, [friend.id, invalidate, startListen, stopListen, user]);

    return (
        <div
            data-testid="chat"
            className="w-[300px] h-[420px] flex flex-col justify-between bg-dark-200 absolute bottom-0 right-2 md:right-20 z-40 rounded-t-lg shadow-md"
        >
            <Header name={friend.name} profileImage={friend.profile_image} />
            <Conversation friendId={friend.id} />
            <Panel />
        </div>
    );
};
