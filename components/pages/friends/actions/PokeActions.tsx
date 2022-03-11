import * as React from 'react';
import { useAxios } from '@hooks/useAxios';

import { Failure } from '@components/pages/friends/actions/messages/Failure';
import { Success } from '@components/pages/friends/actions/messages/Success';
import { Button } from '@components/Button';

import { StateStatus } from '@enums/StateStatus';

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

	if (state.status === StateStatus.SUCCESS) return <Success message="Friend poked back" />;
	if (state.status === StateStatus.ERROR) return <Failure message="Something went wrong" />;

	return (
		<div className="w-[220px] flex flex-col items-center gap-1">
			<Button
				title="Poke back"
				styles="w-[150px]"
				isDisabled={state.status === StateStatus.LOADING}
				callback={event => handlePoke(event)}
			/>

			<div className="flex flex-col items-center text-light-100">
				<small>
					{friend.first_name} poked you {friend.poke_info.count} times in a row
				</small>

				<small>{friend.poke_info.updated_at}</small>
			</div>
		</div>
	);
};
