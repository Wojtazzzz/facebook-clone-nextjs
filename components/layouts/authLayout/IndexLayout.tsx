import { Sidebar } from '@components/sidebar/Sidebar';
import type { ReactNode } from 'react';
import { AuthLayout } from './AuthLayout';

interface IndexLayoutProps {
    children: ReactNode;
}

export const IndexLayout = ({ children }: IndexLayoutProps) => {
    return (
        <AuthLayout>
            <main className="w-full pb-4 mt-14">{children}</main>

            <Sidebar />
        </AuthLayout>
    );
};
