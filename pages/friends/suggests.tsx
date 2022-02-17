import * as React from 'react';
import { useState, useEffect } from 'react';

import { UserLayout } from '@components/layouts/UserLayout';
import { Loader } from '@components/pages/friends/Loader';
import { EmptyList } from '@components/pages/friends/EmptyList';
import { Header } from '@components/pages/friends/Header';
import { User } from '@components/pages/friends/User';
import { RequestActions } from '@components/pages/friends/RequestActions';
import { ApiError } from '@components/ApiError';

import axios from '@lib/axios';

import type { NextPage } from 'next';
import type { UserType } from '@ctypes/features/UserType';


const Suggests: NextPage = () => {
    const [suggests, setSuggests] = useState<UserType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        axios.get('/api/suggests')
            .then(response => setSuggests(response.data.suggests))
            .catch(() => setIsError(true))
            .finally(() => setIsLoading(false));
    }, []);


    const SuggestsComponents = suggests.map(({ id, first_name, last_name, profile_image }) => (
        <User
            key={id}
            path={`/profile/${id}`}
            name={`${first_name} ${last_name}`}
            profile_image={profile_image}
        >
            <RequestActions />
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
                                ? SuggestsComponents
                                : <EmptyList title="Empty! Maybe this app is so boring..." />}
                </div>
            </div>
        </UserLayout>
    )
}

export default Suggests;
