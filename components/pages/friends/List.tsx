import * as React from 'react';
import { useFriends } from '@hooks/useFriends';

import { ListLoader } from '@components/pages/friends/shared/ListLoader';
import { LoadMore } from '@components/pages/friends/shared/LoadMore';
import { ApiError } from '@components/ApiError';
import { EmptyList } from '@components/EmptyList';
import { Slot } from '@components/pages/friends/Slot';
import { Actions } from '@components/pages/friends/actions/Actions';

import { ListType } from '@enums/ListType';

interface ListProps {
	userId: number;
	type: string | string[] | undefined;
}

const getType = (type: string | string[] | undefined) => {
	switch (type) {
		case 'suggests':
			return ListType.SUGGEST;

		case 'invites':
			return ListType.INVITES;

		default:
		case 'friends':
			return ListType.FRIENDS;
	}
};

export const List: React.FC<ListProps> = ({ userId, type }) => {
	const listType = getType(type);
	const { friends, isInitialLoading, isLoading, isError, isReachingEnd, loadMore } = useFriends(listType, userId);

	const slots = friends.map(user => (
		<Slot key={user.id} {...user}>
			<Actions id={user.id} type={listType} />
		</Slot>
	));

	if (isInitialLoading) return <ListLoader />;
	if (isError) return <ApiError />;
	if (slots.length <= 0) return <EmptyList title="No users to add, maybe this app is so boring..." />;

	return (
		<div className="flex flex-col gap-2">
			{slots}

			{isReachingEnd || <LoadMore isLoading={isLoading} callback={loadMore} />}
		</div>
	);
};
