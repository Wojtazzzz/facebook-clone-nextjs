import * as React from 'react';
import { useState } from 'react';
import { useSuggests } from '@hooks/useSuggests';

import { UserLayout } from '@components/layouts/UserLayout';
import { Header } from '@components/pages/friends/Header';
import { User } from '@components/pages/friends/User';
import { SuggestActions } from '@components/pages/friends/SuggestActions';
import { LoadMore } from '@components/pages/friends/LoadMore';
import { List } from '@components/pages/friends/List';

import type { NextPage } from 'next';


const Suggests: NextPage = () => {
    const { suggests, isInitialLoading, isLoading, isError, lastPage, loadMoreSuggests } = useSuggests();
    const [pageToFetch, setPageToFetch] = useState(2);

    const handleLoadMore = () => {
        loadMoreSuggests(pageToFetch);
        setPageToFetch(prevState => prevState + 1);
    }

    const SuggestsComponents = suggests.map(({ id, first_name, last_name, profile_image }) => (
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
                <Header name="Suggests" />

                <List
                    isLoading={isInitialLoading}
                    isError={isError}
                    slots={SuggestsComponents}
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

export default Suggests;
