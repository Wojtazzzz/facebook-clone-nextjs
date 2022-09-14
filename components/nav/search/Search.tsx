import { SearchBox } from '@components/nav/search/input/SearchBox';
import { useOutsideClick } from '@hooks/useOutsideClick';
import { useSearch } from '@hooks/useSearch';
import { Hits } from './hits/Hits';

export const Search = () => {
    const { data, hasNextPage, fetchNextPage, clearQuery, query, ...rest } = useSearch();
    const ref = useOutsideClick(clearQuery);

    return (
        <div ref={ref} className="w-[220px] relative">
            <SearchBox clearQuery={clearQuery} query={query} {...rest} />

            {query && <Hits data={data} hasNextPage={hasNextPage} fetchNextPage={fetchNextPage} />}
        </div>
    );
};
