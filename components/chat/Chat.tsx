import { useEffect } from 'react';
import { useAuth } from '@hooks/useAuth';
import { useBroadcast } from '@hooks/useBroadcast';
import { usePaginatedData } from '@hooks/usePaginatedData';

import { Header } from '@components/chat/header/Header';
import { Messages } from '@components/chat/messages/Messages';
import { Panel } from '@components/chat/panel/Panel';

import type { IChatFriend, IChatMessage } from '@utils/types';

interface ChatProps {
    friend: IChatFriend;
}

export const Chat = ({ friend }: ChatProps) => {
    const { user } = useAuth();
    const { reloadData } = usePaginatedData<IChatMessage>(`/api/messages/${friend.id}`);
    const { startListen, stopListen } = useBroadcast();

    useEffect(() => {
        if (!user) return;

        startListen(`messages.${user.id}.${friend.id}`, 'ChatMessageSent', reloadData);

        return () => stopListen(`messages.${user.id}.${friend.id}`, 'ChatMessageSent');
    }, [friend.id, reloadData, startListen, stopListen, user]);

    return (
        <div
            data-testid="chat"
            className="w-[300px] flex flex-col justify-between bg-dark-200 absolute bottom-0 right-2 md:right-20 z-40 rounded-t-lg shadow-md"
        >
            <Header name={friend.name} profileImage={friend.profile_image} />
            <Messages friendId={friend.id} />
            <Panel />
        </div>
    );
};
