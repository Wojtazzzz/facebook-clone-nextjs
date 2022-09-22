import type { ReactNode } from 'react';
import { Header } from './Header';

interface ContainerProps {
    testId: string;
    title: string;
    children: ReactNode;
}

export const Container = ({ testId, title, children }: ContainerProps) => {
    return (
        <section data-testid={testId} className="w-full bg-dark-200 shadow-sm rounded-lg p-4">
            <Header title={title} />

            {children}
        </section>
    );
};
