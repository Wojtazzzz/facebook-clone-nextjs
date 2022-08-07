import { Loader } from '@components/pages/friends/inc/Loader';
import { ApiError } from '@components/inc/ApiError';
import { EmptyList } from '@components/inc/EmptyList';
import { Item } from '@components/pages/friends/item/Item';

import React, { memo } from 'react';

import type { IFriendsListItem, IFriendsList } from '@utils/types';
import { useInfiniteData } from '@hooks/useInfiniteData';
import InfiniteScroll from 'react-infinite-scroll-component';

interface ListProps {
    path: string;
    type: IFriendsList;
}

export const List = memo<ListProps>(({ path, type }) => {
    const { data, isLoading, isError, isEmpty, hasNextPage, fetchNextPage } = useInfiniteData<IFriendsListItem>(
        ['friends'],
        path
    );

    if (isLoading) return <Loader testId="friendsList-loading_loader" />;
    if (!data || isError) return <ApiError size="xl" styles="mt-8" />;
    if (isEmpty) return <EmptyList title="No users, maybe this app is so boring..." />;

    const ItemsComponents = data.pages.map((page) => (
        <React.Fragment key={page.current_page}>
            {page.data.map((item) => (
                <Item key={item.friend.id} item={item} type={type} />
            ))}
        </React.Fragment>
    ));

    return (
        <div id="friends-list" className="h-screen overflow-auto scrollbar-none">
            <InfiniteScroll
                dataLength={ItemsComponents.length}
                hasMore={!!hasNextPage}
                loader={<Loader testId="friendsList-fetching_loader" />}
                className="w-full flex flex-col gap-2"
                next={fetchNextPage}
                scrollableTarget="friends-list"
            >
                {ItemsComponents}
            </InfiniteScroll>
        </div>
    );
});

List.displayName = 'List';
