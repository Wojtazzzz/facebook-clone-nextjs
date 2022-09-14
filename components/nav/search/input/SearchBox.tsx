import type { ChangeEvent, FormEvent } from 'react';
import { useKey } from '@hooks/useKey';
import { Button } from './button/Button';

interface SearchBoxProps {
    query: string;
    isError: boolean;
    changeQuery: (event: ChangeEvent<HTMLInputElement>) => void;
    clearQuery: () => void;
    refetch: () => void;
}

export const SearchBox = ({ query, isError, changeQuery, clearQuery, refetch }: SearchBoxProps) => {
    useKey('Escape', clearQuery);

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        refetch();
    };

    return (
        <form
            onSubmit={handleSubmit}
            role="search"
            className="w-[200px] lg:w-[220px] h-10 flex justify-center items-center gap-3 text-dark-50 bg-dark-100 rounded-[50px] focus:outline-none"
        >
            <input
                aria-label="Search user"
                name="text"
                type="search"
                autoComplete="off"
                value={query}
                placeholder="Search User"
                className="w-[150px] lg:w-[170px] bg-transparent focus:outline-none"
                onChange={changeQuery}
            />

            <Button isError={isError} query={query} clear={clearQuery} />
        </form>
    );
};
