import { useCallback, useMemo } from 'react';

import Echo from 'laravel-echo';
import axios from '@libs/axios';

require('pusher-js');

export const useBroadcast = () => {
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
                                .then((response) => callback(false, response.data))
                                .catch((error) => callback(true, error));
                        },
                    };
                },
            }),
        []
    );

    const startListen = useCallback(
        (channel: string, event: string, callback: Function) => {
            LaravelEcho.private(channel).listen(event, callback);
        },
        [LaravelEcho]
    );

    const stopListen = (channel: string, event: string) => {
        LaravelEcho.private(channel).stopListening(event);
    };

    return {
        startListen,
        stopListen,
    };
};
