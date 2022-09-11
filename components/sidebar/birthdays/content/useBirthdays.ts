import { axios } from '@libs/axios';
import { useQuery } from '@tanstack/react-query';
import { IBirthday } from '@utils/types';

export const useBirthdays = () => {
    return useQuery<IBirthday[]>(['birthdays'], queryFn);
};

const queryFn = () => axios.get('/api/birthdays').then((response) => response.data);
