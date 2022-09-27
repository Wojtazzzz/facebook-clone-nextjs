import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { ChangeEvent } from 'react';

interface SearchProps {
    query: string;
    changeQuery: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const Search = ({ query, changeQuery }: SearchProps) => {
    const handleSubmit = () => {};

    return (
        <form
            onSubmit={handleSubmit}
            role="search"
            className="w-full max-w-[250px] sm:w-[200px] lg:w-[220px] h-10 flex justify-center items-center gap-3 relative overflow-hidden transition-[width] text-dark-50 bg-dark-200 rounded-[50px] focus:outline-none px-4"
        >
            <div>
                <FontAwesomeIcon icon={faSearch} />
            </div>

            <input
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
