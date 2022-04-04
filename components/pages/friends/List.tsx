import { memo } from 'react';
import { usePaginationData } from '@hooks/usePaginationData';

import { Loader } from '@components/pages/friends/shared/Loader';
import { LoadMore } from '@components/pages/friends/shared/LoadMore';
import { ApiError } from '@components/ApiError';
import { EmptyList } from '@components/EmptyList';
import { Slot } from '@components/pages/friends/Slot';
import { Actions } from '@components/pages/friends/actions/Actions';

import { StatePaginationStatus } from '@enums/StatePaginationStatus';
import { getPathForPagination } from '@utils/getPathForPagination';

import type { UserType } from '@ctypes/features/UserType';

interface ListProps {
    userId: number;
    type: string | string[] | undefined;
}

export const List = memo<ListProps>(({ userId, type }) => {
    const key = getPathForPagination(type ?? '', userId);
    const { data, state, isEmpty, isReachedEnd, loadMore } = usePaginationData(key);

    if (state === StatePaginationStatus.LOADING) return <Loader />;
    if (state === StatePaginationStatus.ERROR) return <ApiError />;
    if (isEmpty || !data) return <EmptyList title="No users, maybe this app is so boring..." />;

    const slots = (data as UserType[]).map((user) => (
        <Slot key={user.id} {...user}>
            <Actions friend={user} type={type ?? ''} />
        </Slot>
    ));

    return (
        <div data-testid="friends-list" className="flex flex-col gap-2">
            {slots}

            {isReachedEnd || <LoadMore isLoading={state === StatePaginationStatus.FETCHING} callback={loadMore} />}
        </div>
    );
});

List.displayName = 'List';
