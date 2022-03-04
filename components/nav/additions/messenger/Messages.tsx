import * as React from 'react';

import { Slot } from '@components/nav/additions/messenger/shared/Slot';

export const Messages = () => {
	return (
		<div className="w-full max-h-[500px] overflow-y-scroll scrollbar-thin scrollbar-thumb-dark-100">
			<Slot />
			<Slot />
			<Slot />
			<Slot />
			<Slot />
			<Slot />
			<Slot />
			<Slot />
			<Slot />
			<Slot />
			<Slot />
		</div>
	);
};
