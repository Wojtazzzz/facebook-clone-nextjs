import { axios } from '@libs/axios';

export const csrf = () => axios.get('/api/csrf-cookie');
