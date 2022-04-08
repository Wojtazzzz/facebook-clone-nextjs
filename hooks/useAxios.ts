import { useState, useEffect, useMemo } from 'react';

import axios from '@libs/axios';

import type { AxiosRequestConfig } from 'axios';
import type { UseAxiosState } from '@ctypes/UseAxiosState';

export const useAxios = <T>() => {
    const [state, setState] = useState<UseAxiosState<T>>({ status: 'EMPTY' });

    const AxiosAbortController = useMemo(() => new AbortController(), []);

    const axiosOptions = { signal: AxiosAbortController.signal };

    useEffect(() => {
        return () => AxiosAbortController.abort();
    }, [AxiosAbortController]);

    const sendRequest = (params: AxiosRequestConfig) => {
        setState({ status: 'LOADING' });

        axios
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
