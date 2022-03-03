import * as React from 'react';
import { useState } from 'react';

import { Failure } from 'components/pages/friends/actions/messages/Failure';
import { Success } from '@components/pages/friends/actions/messages/Success';
import { Button } from '@components/Button';

import axios from '@lib/axios';

import type { UserType } from '@ctypes/features/UserType';

interface SuggestActionsProps {
	friend: UserType;
}

export const SuggestActions = ({ friend }: SuggestActionsProps) => {
	const [isLoading, setIsLoading] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	const [isError, setIsError] = useState(false);

	const handleInvite = (event: FocusEvent) => {
		event.preventDefault();
		setIsLoading(true);

		axios
			.post('/api/invite', { user_id: friend.id })
			.then(() => setIsSuccess(true))
			.catch(() => setIsError(true))
			.finally(() => setIsLoading(false));
	};

	if (isSuccess) return <Success message="Invitation sended" />;
	if (isError) return <Failure message="Something went wrong" />;

	return <Button title="Invite" styles="w-[150px]" isDisabled={isLoading} callback={event => handleInvite(event)} />;
};
