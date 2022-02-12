import * as React from 'react';

import { Nav } from '@components/nav/Nav';
import { Toggler } from '@components/nav/mobile/Toggler';

export const Layout: React.FC = ({ children }) => {
    return (
        <>
            <Nav />

            <main>
                {children}
            </main>

            <Toggler />
        </>
    )
}