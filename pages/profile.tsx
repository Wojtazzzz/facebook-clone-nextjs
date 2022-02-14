import * as React from 'react';

import { UserLayout } from '@components/layouts/UserLayout';
import { Header } from '@components/pages/profile/Header';

import type { NextPage } from 'next';


const Profile: NextPage = () => {
    return (
        <UserLayout>
            <div className="w-full">
                <Header />
            </div>
        </UserLayout>
    )
}

export default Profile;
