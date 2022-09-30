import type { ChangeEvent } from 'react';
import { Search } from './search/Search';

interface HeaderProps {
    query: string;
    changeQuery: (event: ChangeEvent<HTMLInputElement>) => void;
    clearQuery: () => void;
}

export const Header = ({ query, changeQuery, clearQuery }: HeaderProps) => {
    return (
        <header className="w-full flex flex-col sm:flex-row gap-5 justify-between items-center">
            <h2 className="text-2xl text-light-50 font-bold">Friends</h2>

            <Search query={query} changeQuery={changeQuery} clearQuery={clearQuery} />
        </header>
    );
};
