import * as React from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@hooks/useAuth';

import { Header } from '@components/pages/friends/Header';
import { List } from '@components/pages/friends/List';
import { Loader } from '@components/pages/friends/shared/Loader';

export const FriendsList = () => {
	const {
		query: { type },
	} = useRouter();

	const { user } = useAuth();

	return (
		<div className="relative py-5 px-2">
			<Header name={type ?? 'Friends'} />

			{user ? <List userId={user.id} type={type} /> : <Loader />}
		</div>
	);
};
