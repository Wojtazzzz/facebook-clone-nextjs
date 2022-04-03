import { useState, useEffect, useRef } from 'react';
import axios from '@lib/axios';
import { StateStatus } from '@enums/StateStatus';

import type { AxiosRequestConfig } from 'axios';
import type { UseAxiosState } from '@ctypes/UseAxiosState';

export const useAxios = () => {
	const [state, setState] = useState<UseAxiosState>({ status: StateStatus.EMPTY });
	const AxiosAbortControllerRef = useRef(new AbortController());

	const axiosOptions = { signal: AxiosAbortControllerRef.current.signal };

	useEffect(() => {
		return () => AxiosAbortControllerRef.current.abort();
	}, []);

	const sendRequest = (params: AxiosRequestConfig) => {
		setState({ status: StateStatus.LOADING });

		axios
			.request(Object.assign(params, axiosOptions))
			.then(response => setState({ status: StateStatus.SUCCESS, data: response.data ?? [] }))
			.catch(error => {
				if (error.message !== 'canceled') {
					setState({ status: StateStatus.ERROR, error });
				}
			});
	};

	return { state, sendRequest };
};
