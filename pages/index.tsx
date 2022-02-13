import * as React from 'react';
import { useAuth } from '@hooks/useAuth';

import { AuthMiddleware } from '@enums/AuthMiddleware';

import type { NextPage } from 'next';
import { UserLayout } from '@components/layouts/UserLayout';


const Home: NextPage = () => {
    const { logout } = useAuth({ middleware: AuthMiddleware.AUTH });

    return (
        <UserLayout>
            <div className="flex flex-col gap-6 bg-red-400 text-black">
                Logged!

                <span onClick={logout}>
                    Logout
                </span>
            </div>
        </UserLayout>
    )
}

export default Home;
