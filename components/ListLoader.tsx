import { memo, ReactNode } from 'react';

interface ListLoaderProps {
    count?: number;
    styles?: string;
    children: ReactNode;
}

export const ListLoader = memo(({ count = 10, styles = '', children }: ListLoaderProps) => {
    const SingleLoadingsComponents: JSX.Element[] = [];

    for (let i = 0; i < count; i++) {
        SingleLoadingsComponents.push(<div key={i}>{children}</div>);
    }

    return <div className={`w-full ${styles}`}>{SingleLoadingsComponents}</div>;
});

ListLoader.displayName = 'ListLoader';
