import Axios from 'axios';

export const objectsIntoArray = {
    transformResponse: [
        function (responseData: string) {
            let data = JSON.parse(responseData);

            if (!Array.isArray(data)) {
                data = [...Object.values(data)];
            }

            return data;
        },
    ],
};

export const axios = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
});
