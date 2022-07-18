import { usePaginatedData } from '@hooks/usePaginatedData';

import { Loader } from '@components/pages/friends/inc/Loader';
import { LoadMore } from '@components/pages/friends/inc/LoadMore';
import { ApiError } from '@components/inc/ApiError';
import { EmptyList } from '@components/inc/EmptyList';
import { Item } from '@components/pages/friends/item/Item';

import { memo } from 'react';

import type { IFriendsListItem, IFriendsList } from '@utils/types';

interface ListProps {
    type: IFriendsList;
}

export const List = memo<ListProps>(({ type }) => {
    const { data, state, isEmpty, isReachedEnd, loadMore } = usePaginatedData<IFriendsListItem>(getApiPath(type));

    if (state === 'LOADING') return <Loader testId="friendsList-loading_loader" />;
    if (state === 'ERROR') return <ApiError size="xl" styles="mt-8" />;
    if (isEmpty) return <EmptyList title="No users, maybe this app is so boring..." />;

    const ItemsComponents = data.map(({ friend, data }) => (
        <Item key={friend.id} friend={friend} data={data} type={type} />
    ));

    return (
        <div data-testid="friends-list" className="flex flex-col gap-2">
            {ItemsComponents}

            {isReachedEnd || <LoadMore isLoading={state === 'FETCHING'} callback={loadMore} />}
        </div>
    );
});

List.displayName = 'List';

export const getApiPath = (type: IFriendsList) => {
    const paths = {
        Friends: '/api/friends',
        Invites: '/api/friends/invites',
        Suggests: '/api/friends/suggests',
        Pokes: '/api/pokes',
    } as const;

    return paths[type];
};
