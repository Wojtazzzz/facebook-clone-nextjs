import * as React from 'react';

import { ListLoading } from '@components/pages/friends/ListLoading';
import { EmptyList } from '@components/pages/friends/EmptyList';
import { ApiError } from '@components/ApiError';


interface ListProps {
    slots: JSX.Element[],
    isLoading: boolean,
    isError: boolean
}

export const List: React.FC<ListProps> = ({ slots, isLoading, isError }) => {
    if (isLoading) {
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
        </div>
    );
}