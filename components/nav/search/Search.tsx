import { SearchBox } from '@components/nav/search/input/SearchBox';
import { useOutsideClick } from '@hooks/useOutsideClick';
import { useSearch } from '@hooks/useSearch';
import { Hits } from './hits/Hits';

interface SearchProps {
    isActive: boolean;
    open: () => void;
    close: () => void;
}

export const Search = ({ isActive, open, close }: SearchProps) => {
    const { data, hasNextPage, isLoading, fetchNextPage, clearQuery, query, ...rest } = useSearch();
    const ref = useOutsideClick<HTMLDivElement>(clearQuery);

    return (
        <div ref={ref} data-testid="nav-search-desktop" className="relative">
            <SearchBox isActive={isActive} clearQuery={clearQuery} query={query} open={open} close={close} {...rest} />

            {query && (
                <Hits data={data} isLoading={isLoading} hasNextPage={hasNextPage} fetchNextPage={fetchNextPage} />
            )}
        </div>
    );
};
