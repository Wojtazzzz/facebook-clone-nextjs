import type { ReactNode } from 'react';

interface ErrorLayoutProps {
    children: ReactNode;
}

export const ErrorLayout = ({ children }: ErrorLayoutProps) => {
    return (
        <div className="w-full max-w-[500px] h-screen flex justify-center items-center mx-auto pb-24">{children}</div>
    );
};
