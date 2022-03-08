import * as React from 'react';

import { EmptyList as EmptyListComponent } from '@components/EmptyList';

export const EmptyList = () => {
	return (
		<div className="w-full h-full flex justify-content items-center -mt-12 my-8">
			<EmptyListComponent title="Your Messenger is empty" />
		</div>
	);
};
