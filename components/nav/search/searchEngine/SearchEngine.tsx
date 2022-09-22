import { Form } from './form/Form';
import { Results } from './results/Results';
import { useSearchQuery } from './useSearchQuery';

export const SearchEngine = () => {
    const { query, debounceQuery, clearQuery, changeQuery } = useSearchQuery();

    return (
        <div data-testid="nav-search" className="relative">
            <Form query={query} clearQuery={clearQuery} changeQuery={changeQuery} />

            {debounceQuery && <Results query={debounceQuery} clearQuery={clearQuery} />}
        </div>
    );
};
