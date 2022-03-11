import * as React from 'react';
import { memo } from 'react';
import { usePaginationData } from '@hooks/usePaginationData';

import InfiniteScroll from 'react-infinite-scroll-component';
import { Slot } from '@components/nav/additions/notifications/Slot';
import { Loader } from '@components/nav/additions/shared/Loader';
import { ApiError } from '@components/ApiError';
import { EmptyList } from '@components/nav/additions/shared/EmptyList';

import { StatePaginationStatus } from '@enums/StatePaginationStatus';

import type { NotificationType } from '@ctypes/features/NotificationType';

export const NotificationsList = memo(() => {
	const { data, state, isEmpty, isReachedEnd, loadMore } = usePaginationData('/api/notifications');

	if (state === StatePaginationStatus.LOADING || !data) return <Loader />;
	if (state === StatePaginationStatus.ERROR) return <ApiError isSmall />;
	if (isEmpty) return <EmptyList title="Your Notifications list is empty" />;

	const NotificationsComponents = (data as NotificationType[]).map(notification => (
		<Slot key={notification.id} {...notification} />
	));

	return (
		<InfiniteScroll
			dataLength={NotificationsComponents.length}
			next={loadMore}
			hasMore={!isReachedEnd}
			loader={<Loader />}
			scrollableTarget="list-of-notifications"
		>
			{NotificationsComponents}
		</InfiniteScroll>
	);
});

NotificationsList.displayName = 'NotificationsList';
