import InfiniteScroll from 'react-infinite-scroll-component';
import { Loader } from '@components/contacts/list/Loader';
import { Contact } from '@components/contacts/list/Contact';
import { ApiError } from '@components/inc/ApiError';
import { EmptyList } from '@components/inc/EmptyList';
import { memo } from 'react';
import { useInfiniteData } from '@hooks/useInfiniteData';
import type { IContact } from '@utils/types';

export const List = memo(() => {
    const { data, isLoading, isError, isEmpty, hasNextPage, fetchNextPage } = useInfiniteData<IContact>(
        ['contacts'],
        '/api/contacts'
    );

    if (isLoading) return <Loader testId="contacts-loading_loader" />;
    if (!data || isError) return <ApiError size="lg" styles="h-full" />;
    if (isEmpty) return <EmptyList title="No contacts, add some friends!" />;

    const ContactsComponents = data.map((contact) => <Contact key={contact.id} {...contact} />);

    return (
        <div
            data-testid="contacts-list"
            id="list-of-contacts"
            className="w-full overflow-y-scroll scrollbar-thin scrollbar-thumb-dark-200 max-h-full flex flex-col "
        >
            <InfiniteScroll
                dataLength={ContactsComponents.length}
                next={fetchNextPage}
                className="flex flex-col gap-1"
                hasMore={!!hasNextPage}
                loader={<Loader testId="contacts-fetching_loader" />}
                scrollableTarget="list-of-contacts"
            >
                {ContactsComponents}
            </InfiniteScroll>
        </div>
    );
});

List.displayName = 'List';
