import { useState, useRef } from 'react';
import { useSearchBox } from 'react-instantsearch-hooks-web';
import { useKey } from '@hooks/useKey';

import { ClearButton } from '@components/nav/search/input/ClearButton';
import { SearchButton } from '@components/nav/search/input/SearchButton';

import type { ChangeEvent } from 'react';
import type { UseSearchBoxProps } from 'react-instantsearch-hooks-web';

const queryHook: UseSearchBoxProps['queryHook'] = (query, search) => {
    search(query);
};

export const SearchBox = () => {
    const [text, setText] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const { refine, clear } = useSearchBox({ queryHook });
    useKey('Escape', () => handleClear());

    const handleClear = () => {
        clear();
        setText('');
    };

    const handleFocus = () => inputRef.current?.focus();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;

        refine(query);
        setText(query);
    };

    return (
        <div className="w-[200px] lg:w-[220px] h-10 flex justify-center items-center gap-3 text-dark-50 bg-dark-100 rounded-[50px] focus:outline-none">
            <input
                ref={inputRef}
                aria-label="User search input"
                name="text"
                type="text"
                autoComplete="off"
                value={text}
                placeholder="Search User"
                className="w-[150px] lg:w-[170px] bg-transparent focus:outline-none"
                onChange={handleChange}
            />

            {text ? <ClearButton handleClear={handleClear} /> : <SearchButton handleFocus={handleFocus} />}
        </div>
    );
};
