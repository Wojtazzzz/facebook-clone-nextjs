import { useState, useEffect, useMemo } from 'react';

import axios from '@libs/axios';

import type { AxiosRequestConfig } from 'axios';
import type { IUseAxiosState } from '@utils/types';

export const useAxios = <T>() => {
    const [state, setState] = useState<IUseAxiosState<T>>({ status: 'EMPTY' });
    const axiosAbortController = useMemo(() => new AbortController(), []);

    const axiosOptions = { signal: axiosAbortController.signal };

    useEffect(() => {
        return () => axiosAbortController.abort();
    }, [axiosAbortController]);

    const sendRequest = async (params: AxiosRequestConfig) => {
        setState({ status: 'LOADING' });

        return axios
            .request(Object.assign(params, axiosOptions))
            .then((response) => setState({ status: 'SUCCESS', data: response.data ?? [] }))
            .catch((error) => {
                if (error.message !== 'canceled') {
                    setState({ status: 'ERROR', error });
                }
            });
    };

    return { state, sendRequest };
};
