import * as React from 'react';
import { useAxios } from '@hooks/useAxios';

import { Failure } from 'components/pages/friends/actions/messages/Failure';
import { Success } from '@components/pages/friends/actions/messages/Success';
import { Button } from '@components/Button';

import { AxiosStateStatus } from '@enums/AxiosStateStatus';

import type { UserType } from '@ctypes/features/UserType';

interface InviteActionsProps {
	friend: UserType;
}

export const InviteActions = ({ friend }: InviteActionsProps) => {
	const { state, sendRequest } = useAxios();

	const handleAccept = (event: FocusEvent) => {
		event.preventDefault();

		sendRequest({ method: 'POST', url: '/api/accept', data: { user_id: friend.id } });
	};

	const handleReject = (event: FocusEvent) => {
		event.preventDefault();

		sendRequest({ method: 'POST', url: '/api/reject', data: { user_id: friend.id } });
	};

	if (state.status === AxiosStateStatus.SUCCESS) return <Success message="Success" />;
	if (state.status === AxiosStateStatus.ERROR) return <Failure message="Something went wrong" />;

	return (
		<div className="flex gap-3">
			<Button
				title="Reject"
				styles="w-[100px]"
				isDisabled={state.status === AxiosStateStatus.LOADING}
				callback={handleReject}
			/>

			<Button
				title="Accept"
				styles="w-[100px]"
				isDisabled={state.status === AxiosStateStatus.LOADING}
				callback={handleAccept}
			/>
		</div>
	);
};
