import * as React from 'react';

import { ListLoading } from '@components/pages/friends/ListLoading';
import { EmptyList } from '@components/pages/friends/EmptyList';
import { ApiError } from '@components/ApiError';
import { LoadMore } from '@components/pages/friends/LoadMore';


interface ListProps {
    slots: JSX.Element[][],
    isInitialLoading: boolean,
    isLoading: boolean,
    isError: boolean,
    canFetch: boolean,
    loadMore: () => void
}

export const List: React.FC<ListProps> = ({ slots, isInitialLoading, isLoading, isError, canFetch, loadMore }) => {
    if (isInitialLoading) {
        return <ListLoading />;
    }

    if (isError) {
        return <ApiError />;
    }

    if (slots.length <= 0) {
        return <EmptyList title="No users to add, maybe this app is so boring..." />
    }

    return (
        <div className="flex flex-col gap-2">
            {slots}

            {canFetch && (
                <LoadMore
                    isLoading={isLoading}
                    callback={loadMore}
                />
            )}
        </div>
    );
}