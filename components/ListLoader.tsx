import * as React from 'react';
import { memo, ReactNode } from 'react';

interface ListLoaderProps {
	count?: number;
	children: ReactNode;
}

export const ListLoader = memo(({ count = 10, children }: ListLoaderProps) => {
	const SingleLoadingsComponents: JSX.Element[] = [];

	for (let i = 0; i < count; i++) {
		SingleLoadingsComponents.push(<div key={i}>{children}</div>);
	}

	return <div className="w-full">{SingleLoadingsComponents}</div>;
});

ListLoader.displayName = 'ListLoader';
