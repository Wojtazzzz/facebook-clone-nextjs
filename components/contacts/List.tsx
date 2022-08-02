import { usePaginatedData } from '@hooks/usePaginatedData';

import InfiniteScroll from 'react-infinite-scroll-component';
import { Loader } from '@components/contacts/inc/Loader';
import { Contact } from '@components/contacts/inc/Contact';
import { ApiError } from '@components/inc/ApiError';
import { EmptyList } from '@components/inc/EmptyList';

import { memo } from 'react';

import type { IContact } from '@utils/types';

export const List = memo(() => {
    const { data, isLoadingInitialData, isError, isEmpty, isReachedEnd, loadMore } = usePaginatedData<IContact>(
        (index) => `/api/friends/contacts?page=${index + 1}`,
        20
    );

    if (isLoadingInitialData) return <Loader testId="contacts-loading_loader" />;
    if (isError) return <ApiError size="lg" styles="h-full" />;
    if (isEmpty) return <EmptyList title="No contacts, add some friends!" />;

    const ContactsComponents = data.map((contact) => <Contact key={contact.id} {...contact} />);

    return (
        <div data-testid="contacts-list" id="list-of-contacts" className="w-full">
            <InfiniteScroll
                dataLength={ContactsComponents.length}
                next={loadMore}
                className="flex flex-col-reverse gap-1"
                inverse
                hasMore={!isReachedEnd}
                loader={<Loader testId="contacts-fetching_loader" />}
                scrollableTarget="list-of-messages"
            >
                {ContactsComponents}
            </InfiniteScroll>
        </div>
    );
});

List.displayName = 'List';
