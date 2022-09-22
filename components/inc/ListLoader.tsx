import { memo } from 'react';
import type { ReactNode } from 'react';

interface ListLoaderProps {
    testId?: string;
    count?: number;
    styles?: string;
    children: ReactNode;
}

export const ListLoader = memo(({ testId = '', count = 10, styles = '', children }: ListLoaderProps) => {
    const SingleLoadingsComponents: JSX.Element[] = [];

    for (let i = 0; i < count; i++) {
        SingleLoadingsComponents.push(<div key={i}>{children}</div>);
    }

    return (
        <div data-testid={testId} className={`w-full ${styles}`}>
            {SingleLoadingsComponents}
        </div>
    );
});

ListLoader.displayName = 'ListLoader';
