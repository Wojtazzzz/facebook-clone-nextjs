import * as React from 'react';
import { memo } from 'react';
import { useNotifications } from '@hooks/useNotifications';

import InfiniteScroll from 'react-infinite-scroll-component';
import { Slot } from '@components/nav/additions/notifications/Slot';
import { Loader } from '@components/nav/additions/shared/Loader';
import { ApiError } from '@components/ApiError';
import { EmptyList } from '@components/nav/additions/shared/EmptyList';

export const NotificationsList = memo(() => {
	const { notifications, isLoading, isError, isReachedEnd, loadMore } = useNotifications();

	if (isLoading) return <Loader />;
	if (isError) return <ApiError isSmall />;
	if (!!!notifications?.length) return <EmptyList title="Your Notifications list is empty" />;

	const NotificationsComponents = notifications.map(notification => <Slot key={notification.id} {...notification} />);

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
