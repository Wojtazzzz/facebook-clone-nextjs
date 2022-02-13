import * as React from 'react';
import { useAuth } from '@hooks/useAuth';

import { Nav } from '@components/nav/Nav';
import { Toggler } from '@components/nav/mobile/Toggler';
import { AuthMiddleware } from '@enums/AuthMiddleware';


export const UserLayout: React.FC = ({ children }) => {
    useAuth({ middleware: AuthMiddleware.AUTH });

    return (
        <>
            <Nav />

            <main className="mt-14">
                {children}
            </main>

            <Toggler />
        </>
    )
}