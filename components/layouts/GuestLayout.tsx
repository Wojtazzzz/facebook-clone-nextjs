import * as React from 'react';
import { useAuth } from '@hooks/useAuth';

import { AuthMiddleware } from '@enums/AuthMiddleware';


export const GuestLayout: React.FC = ({ children }) => {
    useAuth({ middleware: AuthMiddleware.GUEST });

    return (
        <main className="max-w-7xl mx-auto p-5 md:p-12 lg:p-24">
            {children}
        </main>
    )
}