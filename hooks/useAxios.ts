import { useState, useEffect, useRef } from 'react';

import axios from '@lib/axios';
import { AxiosStateStatus } from '@enums/AxiosStateStatus';

import type { AxiosRequestConfig } from 'axios';

type State =
	| { status: AxiosStateStatus.EMPTY }
	| { status: AxiosStateStatus.LOADING }
	| { status: AxiosStateStatus.ERROR; error: Error }
	| { status: AxiosStateStatus.SUCCESS; data: [] };

export const useAxios = () => {
	const [state, setState] = useState<State>({ status: AxiosStateStatus.EMPTY });
	const AxiosAbortControllerRef = useRef(new AbortController());

	const axiosOptions = { signal: AxiosAbortControllerRef.current.signal };

	useEffect(() => {
		return () => AxiosAbortControllerRef.current.abort();
	}, []);

	const sendRequest = (params: AxiosRequestConfig) => {
		setState({ status: AxiosStateStatus.LOADING });

		axios
			.request(Object.assign(params, axiosOptions))
			.then(response => setState({ status: AxiosStateStatus.SUCCESS, data: response.data ?? [] }))
			.catch(error => {
				if (error.message !== 'canceled') {
					setState({ status: AxiosStateStatus.ERROR, error });
				}
			});
	};

	return { state, sendRequest };
};
