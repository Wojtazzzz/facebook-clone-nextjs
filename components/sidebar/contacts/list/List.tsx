import InfiniteScroll from 'react-infinite-scroll-component';
import { ApiError } from '@components/inc/ApiError';
import { EmptyList } from '@components/inc/EmptyList';
import { memo } from 'react';
import { Loader } from './Loader';
import { Contact } from './Contact';
import { useGetContacts } from './useGetContacts';

export const List = memo(() => {
    const { data, isLoading, isError, isEmpty, hasNextPage, fetchNextPage } = useGetContacts();

    if (isLoading) return <Loader />;
    if (!data || isError) return <ApiError size="lg" styles="h-full" />;
    if (isEmpty) return <EmptyList title="No contacts, add some friends!" />;

    const ContactsComponents = data.map((contact) => <Contact key={contact.id} {...contact} />);

    return (
        <div data-testid="contacts-list" className="w-full flex flex-col">
            <InfiniteScroll
                dataLength={ContactsComponents.length}
                next={fetchNextPage}
                className="flex flex-col gap-1"
                hasMore={!!hasNextPage}
                loader={<Loader />}
                scrollableTarget="sidebar"
            >
                {ContactsComponents}
            </InfiniteScroll>
        </div>
    );
});

List.displayName = 'List';
