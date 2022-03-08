import * as React from 'react';
import { memo } from 'react';

import { SingleLoading } from '@components/contacts/shared/SingleLoading';

export const ListLoader = memo(() => {
	const SingleLoadingsComponents: JSX.Element[] = [];

	for (let i = 0; i < 10; i++) {
		SingleLoadingsComponents.push(<SingleLoading key={i} />);
	}

	return <div className="w-full">{SingleLoadingsComponents}</div>;
});

ListLoader.displayName = 'ListLoader';
