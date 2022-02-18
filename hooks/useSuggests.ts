import { useEffect, useState } from "react";
import useSWRInfinite from 'swr/infinite'

import axios from "@lib/axios";

import type { UserType } from "@ctypes/features/UserType";


export const useSuggests = () => {
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [canFetch, setCanFetch] = useState(true);

    const getKey = (pageIndex: number, previousPageData: []) => {
        if (previousPageData && !previousPageData.length) return null;

        return `/api/suggests?page=${++pageIndex}`;
    }

    const fetcher = (url: string) => axios.get(url)
        .then(response => {
            if (response.data.paginator.current_page === response.data.paginator.last_page) {
                setCanFetch(false);
            }

            return response.data.paginator.data;
        })
        .catch(() => setIsError(true))
        .finally(() => setIsInitialLoading(false));

    const { data, size, setSize } = useSWRInfinite<UserType[]>(getKey, fetcher);

    useEffect(() => {
        if (!data) return;

        if (data.length > 0) {
            setIsInitialLoading(false)
        }

        setIsLoading(false);
    }, [data]);

    const loadMore = () => {
        if (!canFetch) return;

        setIsLoading(true);
        setSize(size + 1);
    }

    return {
        data: data ?? [],
        isInitialLoading,
        isLoading,
        isError,
        canFetch,
        loadMore
    }
}