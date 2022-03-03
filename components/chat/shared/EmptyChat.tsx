import * as React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandshake } from '@fortawesome/free-solid-svg-icons';

export const EmptyChat = () => {
	return (
		<div className="w-full h-full flex flex-col justify-between items-center pt-32 p-6">
			<FontAwesomeIcon icon={faHandshake} className="text-5xl text-light-100" />
			<span className="text-sm text-light-100 font-medium">Say hello to your friend!</span>
		</div>
	);
};
