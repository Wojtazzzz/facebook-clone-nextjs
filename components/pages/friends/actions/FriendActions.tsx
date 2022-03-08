import * as React from 'react';
import { useAppDispatch } from '@hooks/redux';
import { useAxios } from '@hooks/useAxios';

import { Failure } from 'components/pages/friends/actions/messages/Failure';
import { Success } from '@components/pages/friends/actions/messages/Success';
import { Button } from '@components/Button';

import { toggleActive } from '@redux/slices/ChatSlice';
import { AxiosStateStatus } from '@enums/AxiosStateStatus';

import type { UserType } from '@ctypes/features/UserType';

interface FriendActionsProps {
	friend: UserType;
}

export const FriendActions = ({ friend }: FriendActionsProps) => {
	const dispatch = useAppDispatch();
	const { state, sendRequest } = useAxios();

	const handleOpenChat = () => dispatch(toggleActive(friend));

	const handleRemove = (event: FocusEvent) => {
		event.preventDefault();

		sendRequest({ method: 'POST', url: '/api/destroy', data: { user_id: friend.id } });
	};

	if (state.status === AxiosStateStatus.SUCCESS) return <Success message="Friend removed" />;
	if (state.status === AxiosStateStatus.ERROR) return <Failure message="Something went wrong" />;

	return (
		<div className="flex gap-3">
			<Button
				title="Send message"
				styles="w-[140px]"
				isDisabled={state.status === AxiosStateStatus.LOADING}
				callback={handleOpenChat}
			/>

			<Button
				title="Remove"
				styles="w-[100px]"
				isDisabled={state.status === AxiosStateStatus.LOADING}
				callback={handleRemove}
			/>
		</div>
	);
};
