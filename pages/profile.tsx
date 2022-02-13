import * as React from 'react';

import type { NextPage } from 'next';
import { UserLayout } from '@components/layouts/UserLayout';


const Profile: NextPage = () => {
    return (
        <UserLayout>
            <div className="bg-gray-600">
                <span className="text-dark-200">Profile</span>
            </div>
        </UserLayout>
    )
}

export default Profile;
