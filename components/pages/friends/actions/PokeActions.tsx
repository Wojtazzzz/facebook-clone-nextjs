import * as React from 'react';
import { useState } from 'react';

import { Failure } from 'components/pages/friends/actions/messages/Failure';
import { Success } from '@components/pages/friends/actions/messages/Success';
import { Button } from '@components/Button';

import axios from '@lib/axios';

import type { UserType } from '@ctypes/features/UserType';

interface PokeActionsProps {
	friend: UserType;
}

export const PokeActions = ({ friend }: PokeActionsProps) => {
	const [isLoading, setIsLoading] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	const [isError, setIsError] = useState(false);

	const handlePoke = (event: FocusEvent) => {
		event.preventDefault();
		setIsLoading(true);

		axios
			.post('/api/pokes/update', { user_id: friend.id })
			.then(() => setIsSuccess(true))
			.catch(() => setIsError(true))
			.finally(() => setIsLoading(false));
	};

	if (isSuccess) return <Success message="Friend repoked" />;
	if (isError) return <Failure message="Something went wrong" />;

	return <Button title="Repoke" styles="w-[150px]" isDisabled={isLoading} callback={event => handlePoke(event)} />;
};
