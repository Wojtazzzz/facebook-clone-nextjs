import * as React from 'react';
import { useAxios } from '@hooks/useAxios';

import { Failure } from 'components/pages/friends/actions/messages/Failure';
import { Success } from '@components/pages/friends/actions/messages/Success';
import { Button } from '@components/Button';

import { AxiosStateStatus } from '@enums/AxiosStateStatus';

import type { UserType } from '@ctypes/features/UserType';

interface PokeActionsProps {
	friend: UserType;
}

export const PokeActions = ({ friend }: PokeActionsProps) => {
	const { state, sendRequest } = useAxios();

	const handlePoke = (event: FocusEvent) => {
		event.preventDefault();

		sendRequest({ method: 'POST', url: '/api/pokes/update', data: { user_id: friend.id } });
	};

	if (state.status === AxiosStateStatus.SUCCESS) return <Success message="Friend repoked" />;
	if (state.status === AxiosStateStatus.ERROR) return <Failure message="Something went wrong" />;

	return (
		<Button
			title="Repoke"
			styles="w-[150px]"
			isDisabled={state.status === AxiosStateStatus.LOADING}
			callback={event => handlePoke(event)}
		/>
	);
};
