import { useAuth } from '@hooks/useAuth';

import { AuthMiddleware } from '@enums/AuthMiddleware';

interface GuestLayoutProps {
    children: React.ReactNode;
}

export const GuestLayout = ({ children }: GuestLayoutProps) => {
    useAuth(AuthMiddleware.GUEST);

    return <main className="max-w-7xl mx-auto p-5 md:p-12 lg:p-24">{children}</main>;
};
