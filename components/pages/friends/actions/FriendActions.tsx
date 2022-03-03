import * as React from 'react';
import { useState } from 'react';
import { useAppDispatch } from '@hooks/redux';

import { Failure } from 'components/pages/friends/actions/messages/Failure';
import { Success } from '@components/pages/friends/actions/messages/Success';
import { Button } from '@components/Button';

import axios from '@lib/axios';
import { toggleActive } from '@redux/slices/ChatSlice';

import type { UserType } from '@ctypes/features/UserType';

interface FriendActionsProps {
	friend: UserType;
}

export const FriendActions = ({ friend }: FriendActionsProps) => {
	const [isLoading, setIsLoading] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	const [isError, setIsError] = useState(false);
	const dispatch = useAppDispatch();

	const handleOpenChat = () => dispatch(toggleActive(friend));

	const handleRemove = (event: FocusEvent) => {
		event.preventDefault();
		setIsLoading(true);

		axios
			.post('/api/destroy', { user_id: friend.id })
			.then(() => setIsSuccess(true))
			.catch(() => setIsError(true))
			.finally(() => setIsLoading(false));
	};

	if (isSuccess) return <Success message="Friend removed" />;
	if (isError) return <Failure message="Something went wrong" />;

	return (
		<div className="flex gap-3">
			<Button title="Send message" styles="w-[140px]" isDisabled={isLoading} callback={handleOpenChat} />
			<Button title="Remove" styles="w-[100px]" isDisabled={isLoading} callback={handleRemove} />
		</div>
	);
};
