import type { ReactNode } from 'react';

interface ContainerProps {
    testId: string;
    children: ReactNode;
}

export const Container = ({ testId, children }: ContainerProps) => {
    return (
        <div data-testid={testId} className="w-full bg-dark-200 shadow-sm rounded-lg p-3 md:p-4">
            {children}
        </div>
    );
};
