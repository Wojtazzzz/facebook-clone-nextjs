import * as React from 'react';
import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export const Search: React.FC = () => {
	const [text, setText] = useState('');

	return (
		<div className="w-[200px] lg:w-[220px] h-10 flex justify-center items-center gap-3 text-dark-50 bg-dark-100 rounded-[50px] focus:outline-none">
			<FontAwesomeIcon icon={faSearch} className="text-md" />

			<input
				type="text"
				value={text}
				placeholder="Search User"
				className="w-[150px] lg:w-[170px] bg-transparent focus:outline-none"
				onChange={e => setText(e.target.value)}
			/>
		</div>
	);
};
