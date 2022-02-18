import * as React from 'react';
import { useState } from 'react';
import { useInvites } from '@hooks/useInvites';

import { UserLayout } from '@components/layouts/UserLayout';
import { Header } from '@components/pages/friends/Header';
import { User } from '@components/pages/friends/User';
import { SuggestActions } from '@components/pages/friends/SuggestActions';
import { LoadMore } from '@components/pages/friends/LoadMore';
import { List } from '@components/pages/friends/List';

import type { NextPage } from 'next';


const Invites: NextPage = () => {
    const { invites, isInitialLoading, isLoading, isError, lastPage, loadMoreInvites } = useInvites();
    const [pageToFetch, setPageToFetch] = useState(2);

    const handleLoadMore = () => {
        loadMoreInvites(pageToFetch);
        setPageToFetch(prevState => prevState + 1);
    }

    const InvitesComponents = invites.map(({ id, first_name, last_name, profile_image }: any) => (
        <User
            key={id}
            path={`/profile/${id}`}
            name={`${first_name} ${last_name}`}
            profile_image={profile_image}
        >
            <SuggestActions />
        </User>
    ));

    return (
        <UserLayout>
            <div className="py-5 px-2">
                <Header name="Invites" />

                <List
                    isLoading={isInitialLoading}
                    isError={isError}
                    slots={InvitesComponents}
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

export default Invites;
