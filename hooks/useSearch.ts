import type { IUserHit } from '@utils/types';
import { useState } from 'react';
import type { ChangeEvent } from 'react';
import { useDebounce } from './useDebounce';
import { useInfiniteData } from './useInfiniteData';

export const useSearch = () => {
    const [query, setQuery] = useState('');
    const debounceQuery = useDebounce(query);

    const { data, isError, hasNextPage, fetchNextPage } = useInfiniteData<IUserHit>({
        queryKey: ['searching', debounceQuery],
        endpoint: '/api/users',
        params: {
            search: debounceQuery,
        },
        options: { enabled: !!debounceQuery },
    });

    const changeQuery = (event: ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    const clearQuery = () => {
        if (!query) return;

        setQuery('');
    };

    return {
        data,
        isError,
        query,
        hasNextPage,
        fetchNextPage,
        changeQuery,
        clearQuery,
    };
};
