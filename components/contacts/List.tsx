import * as React from 'react';

import { ApiError } from '@components/ApiError';
import { EmptyList } from '@components/EmptyList';
import { LoadMore } from '@components/contacts/shared/LoadMore';
import { ListLoading } from '@components/contacts/shared/ListLoading';

interface ListProps {
	isInitialLoading: boolean;
	isLoading: boolean;
	isError: boolean;
	canFetch: boolean;
	slots: JSX.Element[][];
	loadMore: () => void;
}

export const List: React.FC<ListProps> = ({ isInitialLoading, isLoading, isError, canFetch, slots, loadMore }) => {
	if (isInitialLoading) {
		return <ListLoading />;
	}

	if (isError) {
		return <ApiError isSmall />;
	}

	if (slots[0]?.length <= 0) {
		return <EmptyList title="No contacts, add some friends!" />;
	}

	return (
		<div className="w-full">
			{slots}

			{canFetch && <LoadMore isLoading={isLoading} callback={loadMore} />}
		</div>
	);
};
