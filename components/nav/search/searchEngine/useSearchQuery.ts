import { useState } from 'react';
import type { ChangeEvent } from 'react';
import { useDebounce } from '@hooks/useDebounce';

export const useSearchQuery = () => {
    const [query, setQuery] = useState('');
    const debounceQuery = useDebounce(query);

    const changeQuery = (event: ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    const clearQuery = () => {
        if (!query) return;

        setQuery('');
    };

    return {
        query,
        debounceQuery,
        changeQuery,
        clearQuery,
    };
};
