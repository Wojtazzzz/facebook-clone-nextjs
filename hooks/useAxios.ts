import { useState, useEffect, useMemo } from 'react';

import axios from '@libs/axios';
import { StateStatus } from '@enums/StateStatus';

import type { AxiosRequestConfig } from 'axios';
import type { UseAxiosState } from '@ctypes/UseAxiosState';

export const useAxios = () => {
    const [state, setState] = useState<UseAxiosState>({ status: StateStatus.EMPTY });
    const AxiosAbortController = useMemo(() => new AbortController(), []);

    const axiosOptions = { signal: AxiosAbortController.signal };

    useEffect(() => {
        return () => AxiosAbortController.abort();
    }, [AxiosAbortController]);

    const sendRequest = (params: AxiosRequestConfig) => {
        setState({ status: StateStatus.LOADING });

        axios
            .request(Object.assign(params, axiosOptions))
            .then((response) => setState({ status: StateStatus.SUCCESS, data: response.data ?? [] }))
            .catch((error) => {
                if (error.message !== 'canceled') {
                    setState({ status: StateStatus.ERROR, error });
                }
            });
    };

    return { state, sendRequest };
};
