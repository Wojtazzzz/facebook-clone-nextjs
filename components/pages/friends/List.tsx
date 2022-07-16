import { memo } from 'react';
import { usePaginatedData } from '@hooks/usePaginatedData';

import { Loader } from '@components/pages/friends/inc/Loader';
import { LoadMore } from '@components/pages/friends/inc/LoadMore';
import { ApiError } from '@components/inc/ApiError';
import { EmptyList } from '@components/inc/EmptyList';
import { User } from '@components/pages/friends/inc/User';
import { Actions } from '@components/pages/friends/inc/Actions';

import { getPathForPagination } from '@components/pages/friends/utils';

import type { IUser } from '@utils/types';
import type { IFriendsList } from '@utils/types';

interface ListProps {
    userId: number;
    listType: IFriendsList;
}

export const List = memo<ListProps>(({ userId, listType }) => {
    const key = getPathForPagination(listType, userId);
    const { data, state, isEmpty, isReachedEnd, loadMore } = usePaginatedData<IUser>(key);

    if (state === 'LOADING') return <Loader testId="friendsList-loading_loader" />;
    if (state === 'ERROR') return <ApiError size="xl" styles="mt-8" />;
    if (isEmpty) return <EmptyList title="No users, maybe this app is so boring..." />;

    const UsersComponents = data.map((user) => (
        <User key={user.id} {...user}>
            <Actions friend={user} listType={listType} />
        </User>
    ));

    return (
        <div data-testid="friends-list" className="flex flex-col gap-2">
            {UsersComponents}

            {isReachedEnd || <LoadMore isLoading={state === 'FETCHING'} callback={loadMore} />}
        </div>
    );
});

List.displayName = 'List';
