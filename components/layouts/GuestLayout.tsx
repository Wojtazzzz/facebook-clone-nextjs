import type { ReactNode } from 'react';
import { useAuthMiddleware } from './useAuthMiddleware';

interface GuestLayoutProps {
    children: ReactNode;
}

export const GuestLayout = ({ children }: GuestLayoutProps) => {
    useAuthMiddleware('GUEST');

    return <main className="max-w-7xl mx-auto p-5 md:p-12 lg:p-24">{children}</main>;
};
