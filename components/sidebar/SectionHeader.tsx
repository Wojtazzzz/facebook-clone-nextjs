import { ReactNode } from 'react';

interface SectionHeaderProps {
    title: string;
    children?: ReactNode;
}

export const SectionHeader = ({ title, children }: SectionHeaderProps) => {
    return (
        <div className="w-full flex justify-between items-center text-light-100 pb-1 mb-3">
            <span className="text-lg font-medium">{title}</span>

            {children}
        </div>
    );
};
