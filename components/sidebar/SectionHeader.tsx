import { ReactNode } from 'react';

interface SectionHeaderProps {
    headingId: string;
    title: string;
    children?: ReactNode;
}

export const SectionHeader = ({ headingId, title, children }: SectionHeaderProps) => {
    return (
        <header className="w-full flex justify-between items-center text-light-100 pb-1 mb-3">
            <h4 id={headingId} className="text-lg font-medium">
                {title}
            </h4>

            {children}
        </header>
    );
};
