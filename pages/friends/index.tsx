import * as React from 'react';
import { useState } from 'react';
import { useFriends } from '@hooks/useFriends';

import { UserLayout } from '@components/layouts/UserLayout';
import { Header } from '@components/pages/friends/Header';
import { User } from '@components/pages/friends/User';
import { LoadMore } from '@components/pages/friends/LoadMore';
import { FriendActions } from '@components/pages/friends/FriendActions';
import { List } from '@components/pages/friends/List';

import type { NextPage } from 'next';


const Friends: NextPage = () => {
    const { friends, isInitialLoading, isLoading, isError, lastPage, loadMoreFriends } = useFriends();
    const [pageToFetch, setPageToFetch] = useState(2);

    const handleLoadMore = () => {
        loadMoreFriends(pageToFetch);
        setPageToFetch(prevState => prevState + 1);
    }

    const FriendsComponents = friends.map(({ id, first_name, last_name, profile_image }) => (
        <User
            key={id}
            path={`/profile/${id}`}
            name={`${first_name} ${last_name}`}
            profile_image={profile_image}
        >
            <FriendActions />
        </User>
    ));

    return (
        <UserLayout>
            <div className="py-5 px-2">
                <Header name="Friends" />

                <List
                    isLoading={isInitialLoading}
                    isError={isError}
                    slots={FriendsComponents}
                />

                {pageToFetch > lastPage || (
                    <LoadMore
                        isLoading={isLoading}
                        callback={handleLoadMore}
                    />
                )}
            </div>
        </UserLayout>
    )
}

export default Friends;
