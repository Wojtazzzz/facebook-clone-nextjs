import * as React from 'react';
import { useState } from 'react';

import { Button } from '@components/Button';

import axios from '@lib/axios';

import type { UserType } from '@ctypes/features/UserType';

interface InviteActionsProps {
	friend: UserType;
}

export const InviteActions: React.FC<InviteActionsProps> = ({ friend }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [isSuccessAccept, setIsSuccessAccept] = useState(false);
	const [isSuccessReject, setIsSuccessReject] = useState(false);
	const [isError, setIsError] = useState(false);

	const handleAccept = (event: FocusEvent) => {
		event.preventDefault();
		setIsLoading(true);

		axios
			.post('/api/accept', { user_id: friend.id })
			.then(() => setIsSuccessAccept(true))
			.catch(() => setIsError(true))
			.finally(() => setIsLoading(false));
	};

	const handleReject = (event: FocusEvent) => {
		event.preventDefault();
		setIsLoading(true);

		axios
			.post('/api/reject', { user_id: friend.id })
			.then(() => setIsSuccessReject(true))
			.catch(() => setIsError(true))
			.finally(() => setIsLoading(false));
	};

	if (isSuccessAccept) return <span className="text-sm text-green-600 font-medium">Invitation accepted</span>;
	if (isSuccessReject) return <span className="text-sm text-green-600 font-medium">Invitation rejected</span>;
	if (isError) return <span className="text-sm text-red-400 font-medium">Something went wrong</span>;

	return (
		<div className="flex gap-3">
			<Button title="Reject" styles="w-[100px]" isDisabled={isLoading} callback={handleReject} />
			<Button title="Accept" styles="w-[100px]" isDisabled={isLoading} callback={handleAccept} />
		</div>
	);
};
