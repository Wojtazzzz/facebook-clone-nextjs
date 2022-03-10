import * as React from 'react';
import { memo } from 'react';

import { ListSingleLoader } from '@components/nav/additions/shared/ListSingleLoader';
import { ListLoader } from '@components/ListLoader';

export const Loader = memo(() => {
	return (
		<ListLoader count={8}>
			<ListSingleLoader />
		</ListLoader>
	);
});

Loader.displayName = 'Loader';
