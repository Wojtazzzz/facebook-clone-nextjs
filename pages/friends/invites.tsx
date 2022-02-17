import * as React from 'react';
import { useState, useEffect } from 'react';

import { UserLayout } from '@components/layouts/UserLayout';
import { Loader } from '@components/pages/friends/Loader';
import { EmptyList } from '@components/pages/friends/EmptyList';
import { Header } from '@components/pages/friends/Header';
import { User } from '@components/pages/friends/User';
import { InviteActions } from '@components/pages/friends/InviteActions';

import axios from '@lib/axios';

import type { NextPage } from 'next';


const Invites: NextPage = () => {
    const [invites, setInvites] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        axios.get('/api/invites')
            .then(response => setInvites(response.data.invites))
            .catch(() => setIsError(true))
            .finally(() => setIsLoading(false));
    }, []);


    const InvitesComponents = invites.map(({ id, inviter }) => (
        <User
            key={id}
            path={`/profile/${id}`}
            name={`${inviter.first_name} ${inviter.last_name}`}
            profile_image={inviter.profile_image}
        >
            <InviteActions />
        </User>
    ));

    return (
        <UserLayout>
            <div className="py-5 px-2">
                <Header name="Invites" />

                <div className="flex flex-col gap-2">
                    {isLoading
                        ? <Loader />
                        : InvitesComponents.length > 0
                            ? InvitesComponents
                            : <EmptyList title="Your list of invites is empty" />}
                </div>
            </div>
        </UserLayout>
    )
}

export default Invites;
