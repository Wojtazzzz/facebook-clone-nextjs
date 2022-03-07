import * as React from 'react';
import { useState, useEffect, useMemo } from 'react';
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

type State =
	| { status: 'empty' }
	| { status: 'loading' }
	| { status: 'error'; error: Error }
	| { status: 'success'; data: [] };

export const FriendActions = ({ friend }: FriendActionsProps) => {
	const [state, setState] = useState<State>({ status: 'empty' });
	const dispatch = useAppDispatch();
	const handleOpenChat = () => dispatch(toggleActive(friend));

	const controller = useMemo(() => new AbortController(), []);

	useEffect(() => {
		return () => controller.abort();
	}, [controller]);

	const handleRemove = (event: FocusEvent) => {
		event.preventDefault();
		setState({ status: 'loading' });

		axios
			.post(
				'/api/destroy',
				{ user_id: friend.id },
				{
					signal: controller.signal,
				}
			)
			.then(() => setState({ status: 'success', data: [] }))
			.catch(error => {
				if (error.message !== 'canceled') {
					setState({ status: 'error', error });
				}
			});
	};

	if (state.status === 'success') return <Success message="Friend removed" />;
	if (state.status === 'error') return <Failure message="Something went wrong" />;

	return (
		<div className="flex gap-3">
			<Button
				title="Send message"
				styles="w-[140px]"
				isDisabled={state.status === 'loading'}
				callback={handleOpenChat}
			/>
			<Button title="Remove" styles="w-[100px]" isDisabled={state.status === 'loading'} callback={handleRemove} />
		</div>
	);
};
