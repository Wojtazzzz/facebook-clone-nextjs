import * as React from 'react';
import { useAxios } from '@hooks/useAxios';

import { Failure } from 'components/pages/friends/actions/messages/Failure';
import { Success } from '@components/pages/friends/actions/messages/Success';
import { Button } from '@components/Button';

import { StateStatus } from '@enums/StateStatus';

import type { UserType } from '@ctypes/features/UserType';

interface SuggestActionsProps {
	friend: UserType;
}

export const SuggestActions = ({ friend }: SuggestActionsProps) => {
	const { state, sendRequest } = useAxios();

	const handleInvite = (event: FocusEvent) => {
		event.preventDefault();
		sendRequest({ method: 'POST', url: '/api/friendship/invite', data: { user_id: friend.id } });
	};

	if (state.status === StateStatus.SUCCESS) return <Success message={state.data.message} />;
	if (state.status === StateStatus.ERROR) return <Failure message="Something went wrong, try again later" />;

	return (
		<Button
			title="Invite"
			styles="w-[150px]"
			isDisabled={state.status === StateStatus.LOADING}
			callback={event => handleInvite(event)}
		/>
	);
};
