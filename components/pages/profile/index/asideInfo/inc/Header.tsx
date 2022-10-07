import type { ReactNode } from 'react';

interface HeaderProps {
    headingId: string;
    title: string;
    children?: ReactNode;
}

export const Header = ({ headingId, title, children }: HeaderProps) => {
    return (
        <div className="flex justify-between items-center">
            <header className="text-xl text-light-200 font-bold mb-3">
                <h2 id={headingId}>{title}</h2>
            </header>

            {children}
        </div>
    );
};
