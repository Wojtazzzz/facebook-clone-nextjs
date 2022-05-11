import { memo } from 'react';
import { usePaginatedData } from '@hooks/usePaginatedData';

import { Loader } from '@components/pages/friends/inc/Loader';
import { LoadMore } from '@components/pages/friends/inc/LoadMore';
import { ApiError } from '@components/inc/ApiError';
import { EmptyList } from '@components/inc/EmptyList';
import { User } from '@components/pages/friends/inc/User';
import { Actions } from '@components/pages/friends/inc/Actions';

import { getPathForPagination } from '@utils/getPathForPagination';

import type { UserType } from '@ctypes/features/UserType';

interface ListProps {
    userId: number;
    type: string | string[] | undefined;
}

export const List = memo<ListProps>(({ userId, type }) => {
    const key = getPathForPagination(type ?? '', userId);
    const { data, state, isEmpty, isReachedEnd, loadMore } = usePaginatedData<UserType>(key);

    if (state === 'LOADING') return <Loader testid="friendsList-loading_more_loader" />;
    if (state === 'ERROR') return <ApiError />;
    if (isEmpty || !data) return <EmptyList title="No users, maybe this app is so boring..." />;

    const UsersComponents = data.map((user) => (
        <User key={user.id} {...user}>
            <Actions friend={user} type={type ?? ''} />
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
