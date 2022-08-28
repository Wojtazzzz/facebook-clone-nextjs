import type { ChangeEvent } from 'react';
import { useKey } from '@hooks/useKey';
import { SearchButton } from '@components/nav/search/input/button/SearchButton';
import { ClearButton } from './button/ClearButton';
import { useInputFocus } from '@hooks/useInputFocus';
import { Button } from './button/Button';

interface SearchBoxProps {
    query: string;
    isError: boolean;
    changeQuery: (event: ChangeEvent<HTMLInputElement>) => void;
    clearQuery: () => void;
}

export const SearchBox = ({ query, isError, changeQuery, clearQuery }: SearchBoxProps) => {
    const { inputRef, focus } = useInputFocus();
    useKey('Escape', clearQuery);

    return (
        <div className="w-[200px] lg:w-[220px] h-10 flex justify-center items-center gap-3 text-dark-50 bg-dark-100 rounded-[50px] focus:outline-none">
            <input
                ref={inputRef}
                aria-label="User search input"
                name="text"
                type="text"
                autoComplete="off"
                value={query}
                placeholder="Search User"
                className="w-[150px] lg:w-[170px] bg-transparent focus:outline-none"
                onChange={changeQuery}
            />

            <Button isError={isError} query={query} clear={clearQuery} focus={focus} />
        </div>
    );
};
