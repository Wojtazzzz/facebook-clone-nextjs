import { memo } from 'react';
import { usePaginatedData } from '@hooks/usePaginatedData';

import { LoadMore } from '@components/contacts/inc/LoadMore';
import { Loader } from '@components/contacts/inc/Loader';
import { Contact } from '@components/contacts/inc/Contact';
import { ApiError } from '@components/inc/ApiError';
import { EmptyList } from '@components/inc/EmptyList';

import type { IUser } from '@utils/types';

interface ListProps {
    userId: number;
}

export const List = memo(({ userId }: ListProps) => {
    const { data, state, isEmpty, isReachedEnd, loadMore } = usePaginatedData<IUser>(
        `/api/friendship/friends/${userId}`
    );

    if (state === 'LOADING') return <Loader testId="contacts-loading_loader" />;
    if (state === 'ERROR') return <ApiError size="lg" styles="h-full" />;
    if (isEmpty) return <EmptyList title="No contacts, add some friends!" />;

    const ContactsComponents = data.map((friend) => <Contact key={friend.id} friend={friend} />);

    return (
        <div data-testid="contacts-list" className="w-full">
            {ContactsComponents}

            {isReachedEnd || <LoadMore isLoading={state === 'FETCHING'} callback={loadMore} />}
        </div>
    );
});

List.displayName = 'List';
