import * as React from 'react';
import { useFriends } from '@hooks/useFriends';
import { useRouter } from 'next/router';

import { Header } from '@components/pages/friends/Header';
import { Slot } from '@components/pages/friends/Slot';
import { List } from '@components/pages/friends/List';

import { ListType } from '@enums/ListType';
import { Actions } from './actions/Actions';


const getType = (type: string | string[] | undefined) => {
    switch (type) {
        case 'suggests':
            return ListType.SUGGEST;

        case 'invites':
            return ListType.INVITES;

        default:
        case 'friends':
            return ListType.FRIENDS;
    }
}

export const FriendsList: React.FC = () => {
    const { query: { type } } = useRouter();
    const listType = getType(type);

    const { data, isInitialLoading, isLoading, isError, isReachingEnd, loadMore } = useFriends(listType);

    const slots = data.map(users =>
        users.map(user =>
            <Slot key={user.id} {...user}>
                <Actions id={user.id} type={listType} />
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