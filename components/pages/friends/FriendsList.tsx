import * as React from 'react';
import { useFriends } from '@hooks/useFriends';
import { useRouter } from 'next/router';

import { Header } from '@components/pages/friends/Header';
import { User } from '@components/pages/friends/User';
import { SuggestActions } from '@components/pages/friends/SuggestActions';
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
    const { data, isInitialLoading, isLoading, isError, canFetch, loadMore } = useFriends(getType(type));

    const slots = data.map(users =>
        users.map(user =>
            <User key={user.id} {...user}>
                <SuggestActions />
            </User>
        )
    );

    return (
        <div className="py-5 px-2">
            <Header name="Suggests" />

            <List
                isInitialLoading={isInitialLoading}
                isLoading={isLoading}
                isError={isError}
                canFetch={canFetch}
                slots={slots}
                loadMore={loadMore}
            />
        </div>
    );
}