import * as React from 'react';
import { useAuth } from '@hooks/useAuth';

import { UserLayout } from '@components/layouts/UserLayout';
import { Loader } from '@components/pages/friends/Loader';
import { EmptyList } from '@components/pages/friends/EmptyList';
import { Header } from '@components/pages/friends/Header';
import { User } from '@components/pages/friends/User';
import { FriendActions } from '@components/pages/friends/FriendActions';

import type { NextPage } from 'next';


const Friends: NextPage = () => {
    const { user } = useAuth();

    const FriendsComponents: React.ReactFragment[] = [];

    if (user) {
        user.friends.map(({ id, first_name, last_name, profile_image }) => {
            FriendsComponents.push(
                <User
                    key={id}
                    path={`/profile/${id}`}
                    name={`${first_name} ${last_name}`}
                    profile_image={profile_image}
                >
                    <FriendActions />
                </User>
            );
        });
    }

    return (
        <UserLayout>
            <div className="py-5 px-2">
                <Header name="Friends" />

                <div className="flex flex-col gap-2">
                    {user
                        ? FriendsComponents.length > 0
                            ? FriendsComponents
                            : <EmptyList title="Your list of friends is empty" />
                        : <Loader />}
                </div>
            </div>
        </UserLayout>
    )
}

export default Friends;
