import * as React from 'react';
import { ListLoading } from './shared/ListLoading';

import { LoadMore } from './shared/LoadMore';


interface ListProps {
    isInitialLoading: boolean,
    isLoading: boolean,
    isError: boolean,
    canFetch: boolean,
    slots: JSX.Element[][],
    loadMore: () => void
}

export const List: React.FC<ListProps> = ({ isInitialLoading, isLoading, isError, canFetch, slots, loadMore }) => {
    if (isInitialLoading) {
        return <ListLoading />;
    }

    if (isError) {
        // return <ApiError />;
    }

    if (slots[0]?.length <= 0) {
        // return <EmptyList title="No users to add, maybe this app is so boring..." />
    }
    return (
        <div className="w-full">
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