import * as React from 'react';
import { memo } from 'react';
import { usePaginationData } from '@hooks/usePaginationData';

import { LoadMore } from '@components/contacts/shared/LoadMore';
import { Loader } from '@components/contacts/shared/Loader';
import { Slot } from '@components/contacts/Slot';
import { ApiError } from '@components/ApiError';
import { EmptyList } from '@components/EmptyList';

import { StatePaginationStatus } from '@enums/StatePaginationStatus';

import type { UserType } from '@ctypes/features/UserType';

interface ListProps {
	userId: number;
}

export const List = memo(({ userId }: ListProps) => {
	const { data, state, isEmpty, isReachedEnd, loadMore } = usePaginationData(`/api/friendship/friends/${userId}`);

	if (state === StatePaginationStatus.LOADING) return <Loader />;
	if (state === StatePaginationStatus.ERROR) return <ApiError isSmall />;
	if (isEmpty || !data) return <EmptyList title="No contacts, add some friends!" />;

	const slots = (data as UserType[]).map(friend => <Slot key={friend.id} {...friend} />);

	return (
		<div data-testid="contacts-list" className="w-full">
			{slots}

			{isReachedEnd || <LoadMore isLoading={state === StatePaginationStatus.FETCHING} callback={loadMore} />}
		</div>
	);
});

List.displayName = 'List';
