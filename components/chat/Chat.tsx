import { useEffect, useMemo } from 'react';
import { useAuth } from '@hooks/useAuth';
import { usePaginationData } from '@hooks/usePaginationData';

import { Header } from '@components/chat/Header';
import { Messages } from '@components/chat/Messages';
import { Panel } from '@components/chat/Panel';

import Echo from 'laravel-echo';
import axios from '@libs/axios';

import type { UserType } from '@ctypes/features/UserType';

require('pusher-js');

interface ChatProps {
    friend: UserType;
}

export const Chat = ({ friend }: ChatProps) => {
    const { user } = useAuth();
    const { reloadData } = usePaginationData(`/api/messages/${friend.id}`, 15);

    const LaravelEcho = useMemo(
        () =>
            new Echo({
                broadcaster: 'pusher',
                key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY,
                cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER,
                forceTLS: true,
                authEndpoint: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/broadcasting/auth`,
                authorizer: (channel: { name: string }) => {
                    return {
                        authorize: (socketId: any, callback: (arg0: boolean, arg1: any) => void) => {
                            axios
                                .post('/api/broadcasting/auth', {
                                    socket_id: socketId,
                                    channel_name: channel.name,
                                })
                                .then((response) => {
                                    callback(false, response.data);
                                })
                                .catch((error) => {
                                    callback(true, error);
                                });
                        },
                    };
                },
            }),
        []
    );

    useEffect(() => {
        if (!user) return;

        LaravelEcho.private(`messages.${user.id}.${friend.id}`).listen('ChatMessageSended', () => reloadData());

        return () => {
            LaravelEcho.private(`messages.${user.id}.${friend.id}`).stopListening('ChatMessageSended');
        };
    }, [LaravelEcho, friend.id, user, reloadData]);

    return (
        <div
            data-testid="chat"
            className="w-[300px] h-[420px] flex flex-col justify-between bg-dark-200 absolute bottom-0 right-2 md:right-20 z-40 rounded-t-lg shadow-md"
        >
            <Header name={friend.name} profileImage={friend.profile_image} />
            <Messages friendId={friend.id} name={friend.name} profileImage={friend.profile_image} />
            <Panel friendId={friend.id} />
        </div>
    );
};
