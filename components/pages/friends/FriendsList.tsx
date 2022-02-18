import * as React from 'react';
import { useState, useEffect } from 'react';
import { useFriends } from '@hooks/useFriends';
import { useRouter } from 'next/router';

import { Header } from '@components/pages/friends/Header';
import { Slot } from '@components/pages/friends/Slot';
import { SuggestActions } from '@components/pages/friends/actions/SuggestActions';
import { List } from '@components/pages/friends/List';

import { FriendsLists } from '@enums/FriendsType';


const getType = (type: string | string[] | undefined) => {
    switch (type) {
        case 'suggests':
            return FriendsLists.SUGGEST;

        case 'invites':
            return FriendsLists.INVITES;

        default:
        case 'friends':
            return FriendsLists.FRIENDS;
    }
}

export const FriendsList: React.FC = () => {
    const { query: { type } } = useRouter();
    const { data, isInitialLoading, isLoading, isError, loadMore } = useFriends(getType(type));

    const [isReachingEnd, setIsReachingEnd] = useState(false);

    useEffect(() => {
        const isEmpty = data?.[0]?.length === 0;
        setIsReachingEnd(isEmpty || (data && data[data.length - 1]?.length < 10));
    }, [data]);

    const slots = data.map(users =>
        users.map(user =>
            <Slot key={user.id} {...user}>
                <SuggestActions />
            </Slot>
        )
    );

    return (
        <div className="relative py-5 px-2">
            <Header name={type ?? 'Friends'} />

            <List
                isInitialLoading={isInitialLoading}
                isLoading={isLoading}
                isError={isError}
                canFetch={!isReachingEnd}
                slots={slots}
                loadMore={loadMore}
            />
        </div>
    );
}