import * as React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface ButtonProps {
	name: string;
	icon: IconDefinition;
	callback: () => void;
}

export const Button = ({ name, icon, callback }: ButtonProps) => {
	return (
		<button
			aria-label={name}
			title={name}
			className="w-10 h-10 flex justify-center items-center bg-dark-100 hover:opacity-80 rounded-full p-3"
			onClick={callback}
		>
			<FontAwesomeIcon icon={icon} className="text-lg text-light-50" />
		</button>
	);
};
