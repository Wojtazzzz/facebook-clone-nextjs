import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useInputFocus } from '@hooks/useInputFocus';
import type { ChangeEvent, FormEvent } from 'react';
import { Button } from './Button';

interface SearchProps {
    query: string;
    changeQuery: (event: ChangeEvent<HTMLInputElement>) => void;
    clearQuery: () => void;
}

export const Search = ({ query, changeQuery, clearQuery }: SearchProps) => {
    const { inputRef, focus } = useInputFocus();

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
    };

    return (
        <form
            role="search"
            className="w-full max-w-[250px] sm:w-[200px] lg:w-[220px] h-10 flex justify-center items-center gap-3 relative overflow-hidden transition-[width] text-dark-50 bg-dark-200 rounded-[50px] focus:outline-none px-4"
            onSubmit={handleSubmit}
        >
            {query.length > 0 ? (
                <Button label="Clear input" icon={faTimes} callback={clearQuery} />
            ) : (
                <Button label="Focus input" icon={faSearch} callback={focus} />
            )}

            <input
                ref={inputRef}
                aria-label="Search friend"
                name="text"
                type="search"
                autoComplete="off"
                placeholder="Search"
                value={query}
                className="w-full text-sm sm:text-base bg-transparent focus:outline-none"
                onChange={changeQuery}
            />
        </form>
    );
};
