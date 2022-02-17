import * as React from 'react';
import { useState, useEffect } from 'react';

import { UserLayout } from '@components/layouts/UserLayout';
import { Loader } from '@components/pages/friends/Loader';
import { EmptyList } from '@components/pages/friends/EmptyList';
import { Header } from '@components/pages/friends/Header';
import { User } from '@components/pages/friends/User';
import { SuggestActions } from '@components/pages/friends/SuggestActions';
import { ApiError } from '@components/ApiError';
import { LoadMore } from '@components/pages/friends/LoadMore';

import axios from '@lib/axios';

import type { NextPage } from 'next';
import type { UserType } from '@ctypes/features/UserType';


const Suggests: NextPage = () => {
    const [suggests, setSuggests] = useState<UserType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [maxPages, setMaxPages] = useState(1);

    const [loadedPages, setLoadedPages] = useState(1);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    useEffect(() => {
        axios.get('/api/suggests')
            .then(response => {
                setMaxPages(response.data.paginator.last_page);
                setSuggests(response.data.paginator.data)
            })
            .catch(() => setIsError(true))
            .finally(() => setIsLoading(false));
    }, []);

    const handleLoadMore = () => {
        setIsLoadingMore(true);

        axios.get(`/api/suggests?page=${loadedPages + 1}`)
            .then(response => {
                setLoadedPages(prevValue => prevValue + 1);
                setSuggests(prevValue => [...prevValue, ...response.data.paginator.data]);
            })
            .catch(() => setIsError(true))
            .finally(() => setIsLoadingMore(false));
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

                <div className="flex flex-col gap-2">
                    {isLoading
                        ? <Loader />
                        : isError
                            ? <ApiError />
                            : SuggestsComponents.length > 0
                                ? <>
                                    {SuggestsComponents}
                                    {isLoadingMore
                                        ? <Loader />
                                        : (loadedPages >= maxPages) || <LoadMore callback={handleLoadMore} />}
                                </>
                                : <EmptyList title="Empty! Maybe this app is so boring..." />}
                </div>
            </div>
        </UserLayout>
    )
}

export default Suggests;
