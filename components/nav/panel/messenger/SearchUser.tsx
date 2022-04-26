import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export const SearchUser = () => {
    const [text, setText] = useState('');

    return (
        <div className="w-full h-10 flex items-center gap-3 text-dark-50 bg-dark-100 rounded-[50px] focus:outline-none px-3">
            <FontAwesomeIcon icon={faSearch} className="text-md" />

            <input
                type="text"
                aria-label="Search user"
                value={text}
                placeholder="Search user"
                className="w-[150px] lg:w-[170px] bg-transparent focus:outline-none"
                onChange={(e) => setText(e.target.value)}
            />
        </div>
    );
};
