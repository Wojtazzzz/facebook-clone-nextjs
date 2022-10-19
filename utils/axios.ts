import Axios from 'axios';
import { BACKEND_URL } from './env';

export const axios = Axios.create({
    baseURL: BACKEND_URL,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
});
