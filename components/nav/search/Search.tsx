import { InstantSearch } from 'react-instantsearch-hooks-web';
import { SearchBox } from '@components/nav/search/input/SearchBox';
import { Hits } from '@components/nav/search/hits/Hits';

import algoliasearch from 'algoliasearch/lite';

export const Search = () => {
    if (true) {
        return <div className="w-[220px] relative">No searching</div>;
    }

    const searchClient = algoliasearch('AQHMU0MNAT', '01322bb95c6341b4a8b048c5b050ad99');

    return (
        <InstantSearch searchClient={searchClient} indexName="users">
            <div className="w-[220px] relative">
                <SearchBox />
                <Hits />
            </div>
        </InstantSearch>
    );
};
