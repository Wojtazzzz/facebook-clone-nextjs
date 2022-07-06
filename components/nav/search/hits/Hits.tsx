import { useConfigure, useInfiniteHits, useSearchBox } from 'react-instantsearch-hooks-web';
import { useOutsideClick } from '@hooks/useOutsideClick';

import { Hit } from '@components/nav/search/hits/Hit';
import { NoResults } from '@components/nav/search/hits/NoResults';
import { LoadMore } from '@components/nav/search/hits/LoadMore';

import type { UserHit } from '@ctypes/UserHitType';

export const Hits = () => {
    const { clear } = useSearchBox();
    const { hits, results, showMore, isLastPage } = useInfiniteHits<UserHit>();
    useConfigure({
        hitsPerPage: 8,
    });
    const ref = useOutsideClick(clear);

    const HitsComponents = hits.map((hit) => <Hit key={hit.id} {...hit} />);

    if (!!!results?.query) return <></>;

    return (
        <div
            data-testid="search-hits"
            ref={ref}
            className="w-full max-h-[450px] absolute top-full left-0 bg-dark-200 overflow-y-auto rounded-md shadow-md scrollbar-thin scrollbar-thumb-dark-100 p-2"
        >
            {!!hits.length ? (
                <>
                    {HitsComponents}
                    {isLastPage || <LoadMore loadMore={showMore} />}
                </>
            ) : (
                <NoResults />
            )}
        </div>
    );
};
