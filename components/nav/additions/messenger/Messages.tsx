import * as React from 'react';
import { memo } from 'react';
import { useMessenger } from '@hooks/useMessenger';

import InfiniteScroll from 'react-infinite-scroll-component';
import { Slot } from '@components/nav/additions/messenger/shared/Slot';
import { ListLoader } from '@components/nav/additions/messenger/shared/ListLoader';
import { ApiError } from '@components/ApiError';

export const Messages = memo(() => {
	const { contacts, isError, isReachedEnd, loadMore } = useMessenger();

	if (isError) return <ApiError isSmall />;

	const ContactsComponents = (contacts ?? []).map(contact => <Slot key={contact.id} {...contact} />);

	return (
		<InfiniteScroll
			dataLength={ContactsComponents.length}
			next={loadMore}
			hasMore={!isReachedEnd}
			loader={<ListLoader />}
			scrollableTarget="list-of-messenger-contacts"
		>
			{ContactsComponents}
		</InfiniteScroll>
	);
});

Messages.displayName = 'Messages';
