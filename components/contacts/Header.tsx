import * as React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export const Header = () => {
	return (
		<div className="w-full flex justify-between items-center text-light-100 border-b-2 border-dark-200 pb-1 mb-3">
			<span className="text-lg font-medium">Contacts</span>

			<div className="w-10 h-10 flex justify-center items-center hover:bg-dark-200 rounded-full transition-colors cursor-pointer">
				<FontAwesomeIcon className="text-lg" icon={faSearch} />
			</div>
		</div>
	);
};
