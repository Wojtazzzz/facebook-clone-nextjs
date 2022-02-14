import * as React from 'react';
import { useAuth } from '@hooks/useAuth';

import { Nav } from '@components/nav/Nav';
import { Toggler } from '@components/nav/mobile/Toggler';
import { Sidebar } from '@components/sidebar/Sidebar';

import { AuthMiddleware } from '@enums/AuthMiddleware';


export const UserLayout: React.FC = ({ children }) => {
    useAuth({ middleware: AuthMiddleware.AUTH });

    return (
        <>
            <Nav />

            <div className="flex justify-between relative mt-14">
                <Sidebar />

                <main className="h-screen overflow-y-scroll pb-14">
                    {children}
                </main>

                <Sidebar />
            </div>

            <Toggler />
        </>
    )
}