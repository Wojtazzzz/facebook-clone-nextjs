import * as React from 'react';
import { useAuth } from '@hooks/useAuth';

import { AuthMiddleware } from '@enums/AuthMiddleware';
import { useRouter } from 'next/router';


export const GuestLayout: React.FC = ({ children }) => {
    const { user } = useAuth({ middleware: AuthMiddleware.GUEST });
    const { push } = useRouter();

    if (user) push('/');

    return (
        <main className="max-w-7xl mx-auto p-5 md:p-12 lg:p-24">
            {children}
        </main>
    )
}