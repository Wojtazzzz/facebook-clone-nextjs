import * as React from 'react';
import { useFriends } from '@hooks/useFriends';

import { ApiError } from '@components/ApiError';
import { EmptyList } from '@components/EmptyList';
import { LoadMore } from '@components/contacts/shared/LoadMore';
import { ListLoader } from '@components/contacts/shared/ListLoader';
import { Slot } from '@components/contacts/Slot';

import { ListType } from '@enums/ListType';

interface ListProps {
	userId: number;
}

export const List: React.FC<ListProps> = ({ userId }) => {
	const { friends, isInitialLoading, isLoading, isError, isReachingEnd, loadMore } = useFriends(
		ListType.FRIENDS,
		userId
	);

	if (isInitialLoading) {
		return <ListLoader />;
	}

	if (isError) {
		return <ApiError isSmall />;
	}

	const slots = friends.map(friend => <Slot key={friend.id} {...friend} />);

	if (slots.length <= 0) {
		return <EmptyList title="No contacts, add some friends!" />;
	}

	return (
		<div className="w-full">
			{slots}

			{isReachingEnd || <LoadMore isLoading={isLoading} callback={loadMore} />}
		</div>
	);
};
