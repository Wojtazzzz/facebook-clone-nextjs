import type { ReactNode } from 'react';

interface HeaderProps {
    title: string;
    children?: ReactNode;
}

export const Header = ({ title, children }: HeaderProps) => {
    return (
        <div className="flex justify-between items-center">
            <header className="text-xl text-light-200 font-bold mb-3">{title}</header>

            {children}
        </div>
    );
};
