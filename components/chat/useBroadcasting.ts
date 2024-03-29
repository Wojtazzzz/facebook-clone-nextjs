import { useCallback, useEffect, useMemo } from 'react';
import Echo from 'laravel-echo';
import { axios } from '@utils/axios';
import Pusher from 'pusher-js';
import { useAuth } from '@hooks/useAuth';
import { useChat } from '@hooks/useChat';
import type { IChatFriend } from '@utils/types';
import { BACKEND_URL } from '@utils/env';

if (typeof window !== 'undefined') {
    (window as any).Pusher = Pusher;
}

export const useBroadcasting = (friend: IChatFriend) => {
    const { user } = useAuth();
    const { revalidateMessages } = useChat();

    const LaravelEcho = useMemo(
        () =>
            new Echo({
                broadcaster: 'pusher',
                key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY,
                cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER,
                forceTLS: true,
                authEndpoint: `${BACKEND_URL}/api/broadcasting/auth`,
                authorizer,
            }),
        []
    );

    const startListen = useCallback(
        (channel: string, event: string, callback: Function) => {
            LaravelEcho.private(channel).listen(event, callback);
        },
        [LaravelEcho]
    );

    const stopListen = useCallback(
        (channel: string, event: string) => {
            LaravelEcho.private(channel).stopListening(event);
        },
        [LaravelEcho]
    );

    useEffect(() => {
        if (!user) return;

        startListen(`messages.${friend.id}.${user.id}`, 'ChatMessageSent', revalidateMessages);

        return () => stopListen(`messages.${friend.id}.${user.id}`, 'ChatMessageSent');
    }, [friend.id, revalidateMessages, startListen, stopListen, user]);

    return {
        startListen,
        stopListen,
    };
};

type IChannel = {
    name: string;
};

type IAuthorizeCallback = (arg0: boolean, arg1: any) => void;

const authorizer = (channel: IChannel) => ({
    authorize: (socketId: string, callback: IAuthorizeCallback) => {
        axios
            .post('/api/broadcasting/auth', {
                socket_id: socketId,
                channel_name: channel.name,
            })
            .then((response) => callback(false, response.data))
            .catch((error) => callback(true, error));
    },
});
