import * as React from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@hooks/useAuth';

import { Header } from '@components/pages/friends/Header';
import { List } from '@components/pages/friends/List';
import { ListLoader } from '@components/pages/friends/shared/ListLoader';

export const FriendsList: React.FC = () => {
	const {
		query: { type },
	} = useRouter();

	const { user } = useAuth();

	return (
		<div className="relative py-5 px-2">
			<Header name={type ?? 'Friends'} />

			{user ? <List userId={user.id} type={type} /> : <ListLoader />}
		</div>
	);
};
