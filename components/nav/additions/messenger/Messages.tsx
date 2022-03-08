import * as React from 'react';
import { memo } from 'react';
import { useMessenger } from '@hooks/useMessenger';

import InfiniteScroll from 'react-infinite-scroll-component';
import { Slot } from '@components/nav/additions/messenger/shared/Slot';
import { Loader } from '@components/nav/additions/messenger/shared/Loader';
import { ApiError } from '@components/ApiError';
import { EmptyList } from '@components/nav/additions/messenger/shared/EmptyList';

export const Messages = memo(() => {
	const { contacts, isLoading, isError, isReachedEnd, loadMore } = useMessenger();

	if (isLoading) return <Loader />;
	if (isError) return <ApiError isSmall />;
	if (!!!contacts) return <EmptyList />;

	const ContactsComponents = contacts.map(contact => <Slot key={contact.id} {...contact} />);

	return (
		<InfiniteScroll
			dataLength={ContactsComponents.length}
			next={loadMore}
			hasMore={!isReachedEnd}
			loader={<Loader />}
			scrollableTarget="list-of-messenger-contacts"
		>
			{ContactsComponents}
		</InfiniteScroll>
	);
});

Messages.displayName = 'Messages';
