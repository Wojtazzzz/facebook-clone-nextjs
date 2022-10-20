import type { ReactNode } from 'react';
import { AuthLayout } from '../AuthLayout';

interface MainLayoutProps {
    children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
    return (
        <AuthLayout>
            <main className="w-full mt-14">{children}</main>
        </AuthLayout>
    );
};
