import * as React from 'react';
import { memo } from 'react';

import { SingleLoader } from '@components/nav/additions/messenger/shared/SingleLoader';
import { ListLoader } from '@components/ListLoader';

export const Loader = memo(() => {
	return (
		<ListLoader count={8}>
			<SingleLoader />
		</ListLoader>
	);
});

Loader.displayName = 'Loader';
