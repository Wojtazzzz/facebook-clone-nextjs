import { axios } from '@utils/axios';
import { useQuery } from '@tanstack/react-query';
import { getBirthdaysQK } from '@utils/queryKeys';
import type { IBirthday } from '@utils/types';

export const useBirthdays = () => {
    return useQuery<IBirthday[]>(getBirthdaysQK(), queryFn);
};

const queryFn = () => axios.get('/api/birthdays').then((response) => response.data);
