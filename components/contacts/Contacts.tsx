import * as React from 'react';
import { useState, useEffect } from 'react';
import { useFriends } from '@hooks/useFriends';

import { Header } from '@components/contacts/Header';
import { List } from '@components/contacts/List';
import { Slot } from '@components/contacts/Slot';

import { FriendsLists } from '@enums/FriendsType';


export const Contacts: React.FC = () => {
    const { data, isInitialLoading, isLoading, isError, loadMore } = useFriends(FriendsLists.FRIENDS);
    const [isReachingEnd, setIsReachingEnd] = useState(false);

    useEffect(() => {
        const isEmpty = data?.[0]?.length === 0;
        setIsReachingEnd(isEmpty || (data && data[data.length - 1]?.length < 10));
    }, [data]);

    const slots = data.map(friends =>
        friends.map(friend => <Slot key={friend.id} {...friend} />)
    );

    return (
        <aside className="w-full max-w-[250px] xl:max-w-[300px] h-screen flex flex-col px-2 pr-4 py-5 overflow-y-scroll pb-14">
            <Header />

            <List
                isInitialLoading={isInitialLoading}
                isLoading={isLoading}
                isError={isError}
                canFetch={!isReachingEnd}
                slots={slots}
                loadMore={loadMore}
            />
        </aside>
    );
}