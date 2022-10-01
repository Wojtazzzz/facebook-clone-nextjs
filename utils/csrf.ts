import { axios } from '@utils/axios';

export const csrf = () => axios.get('/api/csrf-cookie');
