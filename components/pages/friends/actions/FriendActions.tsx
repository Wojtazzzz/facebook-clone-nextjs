import * as React from 'react';
import { useState } from 'react';
import { useAppDispatch } from '@hooks/redux';

import { Button } from '@components/Button';

import axios from '@lib/axios';
import { toggleActive } from '@redux/slices/ChatSlice';

import type { UserType } from '@ctypes/features/UserType';

interface FriendActionsProps {
	friend: UserType;
}

export const FriendActions: React.FC<FriendActionsProps> = ({ friend }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	const [isError, setIsError] = useState(false);
	const dispatch = useAppDispatch();

	const handleOpenChat = () => dispatch(toggleActive({ isActive: true, friend }));

	const handleRemove = (event: FocusEvent) => {
		event.preventDefault();
		setIsLoading(true);

		axios
			.post('/api/destroy', { user_id: friend.id })
			.then(() => setIsSuccess(true))
			.catch(() => setIsError(true))
			.finally(() => setIsLoading(false));
	};

	if (isSuccess) return <span className="text-sm text-green-600 font-medium">Friend removed</span>;
	if (isError) return <span className="text-sm text-red-400 font-medium">Something went wrong</span>;

	return (
		<div className="flex gap-3">
			<Button title="Send message" styles="w-[140px]" isDisabled={isLoading} callback={handleOpenChat} />

			<Button title="Remove" styles="w-[100px]" isDisabled={isLoading} callback={handleRemove} />
		</div>
	);
};
