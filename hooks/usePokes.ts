import { useAxios } from '@hooks/useAxios';

export const usePokes = () => {
    const { state, sendRequest } = useAxios();

    const poke = (friendId: number) => {
        sendRequest({ method: 'POST', url: '/api/pokes', data: { friend_id: friendId } });
    };

    return {
        state,
        poke,
    };
};
