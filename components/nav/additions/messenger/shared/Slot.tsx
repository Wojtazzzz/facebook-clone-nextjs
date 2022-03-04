import * as React from 'react';

import { Avatar } from '@components/Avatar';

interface SlotProps {}

export const Slot = ({}: SlotProps) => {
	return (
		<div className="w-full flex gap-3 hover:bg-dark-100 transition-colors rounded-lg cursor-pointer p-2">
			<Avatar src="https://via.placeholder.com/168x168.png/00aa44?text=ipsam" size={56} alt="Jan Kowalski" />

			<div className="flex flex-col">
				<span className="text-light-200">Jan Kowalski</span>
				<span className="text-sm text-light-100">Message...</span>
			</div>
		</div>
	);
};
