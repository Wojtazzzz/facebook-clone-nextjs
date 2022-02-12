import * as React from 'react';

import { Nav } from '@components/nav/Nav';

export const Layout: React.FC = ({ children }) => {
    return (
        <>
            <Nav />

            <main>
                {children}
            </main>
        </>
    )
}