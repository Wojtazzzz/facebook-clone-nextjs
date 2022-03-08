import * as React from 'react';
import { useAxios } from '@hooks/useAxios';

import { Failure } from 'components/pages/friends/actions/messages/Failure';
import { Success } from '@components/pages/friends/actions/messages/Success';
import { Button } from '@components/Button';

import { AxiosStateStatus } from '@enums/AxiosStateStatus';

import type { UserType } from '@ctypes/features/UserType';

interface SuggestActionsProps {
	friend: UserType;
}

export const SuggestActions = ({ friend }: SuggestActionsProps) => {
	const { state, sendRequest } = useAxios();

	const handleInvite = (event: FocusEvent) => {
		event.preventDefault();

		sendRequest({ method: 'POST', url: '/api/invite', data: { user_id: friend.id } });
	};

	if (state.status === AxiosStateStatus.SUCCESS) return <Success message="Invitation sended" />;
	if (state.status === AxiosStateStatus.ERROR) return <Failure message="Something went wrong" />;

	return (
		<Button
			title="Invite"
			styles="w-[150px]"
			isDisabled={state.status === AxiosStateStatus.LOADING}
			callback={event => handleInvite(event)}
		/>
	);
};
