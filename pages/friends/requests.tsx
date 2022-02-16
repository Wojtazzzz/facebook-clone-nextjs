import * as React from 'react';
import { useState, useEffect } from 'react';

import { UserLayout } from '@components/layouts/UserLayout';
import { Loader } from '@components/pages/friends/Loader';
import { EmptyList } from '@components/pages/friends/EmptyList';
import { Header } from '@components/pages/friends/Header';
import { User } from '@components/pages/friends/User';
import { RequestActions } from '@components/pages/friends/RequestActions';

import type { NextPage } from 'next';
import axios from '@lib/axios';


const Requests: NextPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        axios.get('/api/requests')
            .then(response => setRequests(response.data.requests))
            .catch(() => console.log('Some error will be showed there in the future, I hope ;)'))
            .finally(() => setIsLoading(false));
    }, []);


    const RequestsComponents = requests.map(({ id, inviter }) => (
        <User
            key={id}
            path={`/profile/${id}`}
            name={`${inviter.first_name} ${inviter.last_name}`}
            profile_image={inviter.profile_image}
        >
            <RequestActions />
        </User>
    ));

    return (
        <UserLayout>
            <div className="py-5 px-2">
                <Header name="Requests" />

                <div className="flex flex-col gap-2">
                    {isLoading
                        ? <Loader />
                        : RequestsComponents.length > 0
                            ? RequestsComponents
                            : <EmptyList title="Your list of requests is empty" />}
                </div>
            </div>
        </UserLayout>
    )
}

export default Requests;
