import * as React from 'react';

import { UserLayout } from '@components/layouts/UserLayout';

import type { NextPage } from 'next';


const Home: NextPage = () => {
    return (
        <UserLayout>
            <div className="flex flex-col gap-6 bg-red-400 text-black">
                Logged!
            </div>
        </UserLayout>
    )
}

export default Home;
