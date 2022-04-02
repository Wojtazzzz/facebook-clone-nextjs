import * as React from 'react';
import { Form } from '@components/pages/posts/create/modal/Form';
import { Success } from '@components/pages/posts/create/modal/Success';
import { SpinnerLoader } from '@components/SpinnerLoader';
import { ApiError } from '@components/ApiError';

import { StateStatus } from '@enums/StateStatus';

import type { CreatePostPayload } from '@ctypes/forms/CreatePostPayload';
import type { UseAxiosState } from '@ctypes/UseAxiosState';

interface ContentProps {
	state: UseAxiosState;
	createPost: (data: CreatePostPayload) => void;
}

export const Content = ({ state, createPost }: ContentProps) => {
	if (state.status === StateStatus.ERROR) return <ApiError isSmall styles="pb-12" />;
	if (state.status === StateStatus.LOADING)
		return <SpinnerLoader containerStyles="my-14" spinnerStyles="w-16 h-16" />;
	if (state.status === StateStatus.SUCCESS) return <Success />;
	return <Form createPost={createPost} />;
};
