import * as React from 'react';
import { useSuggests } from '@hooks/useSuggests';

import { UserLayout } from '@components/layouts/UserLayout';
import { Header } from '@components/pages/friends/Header';
import { User } from '@components/pages/friends/User';
import { SuggestActions } from '@components/pages/friends/SuggestActions';
import { List } from '@components/pages/friends/List';

import type { NextPage } from 'next';


const Suggests: NextPage = () => {
    const { data, isInitialLoading, isLoading, isError, canFetch, loadMore } = useSuggests();

    const slots = data.map(users =>
        users.map(user =>
            <User key={user.id} {...user}>
                <SuggestActions />
            </User>
        ));

    return (
        <UserLayout>
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
        </UserLayout>
    )
}

export default Suggests;
