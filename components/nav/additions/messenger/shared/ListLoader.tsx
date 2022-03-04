import * as React from 'react';
import { memo } from 'react';

import { SingleLoader } from '@components/nav/additions/messenger/shared/SingleLoader';

export const ListLoader = memo(() => {
	const SingleLoadingsComponents: JSX.Element[] = [];

	for (let i = 0; i < 5; i++) {
		SingleLoadingsComponents.push(<SingleLoader key={i} />);
	}

	return <>{SingleLoadingsComponents}</>;
});

ListLoader.displayName = 'ListLoader';
