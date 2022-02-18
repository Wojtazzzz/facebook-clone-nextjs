import { useEffect, useState } from "react";

import axios from "@lib/axios";

import type { UserType } from "@ctypes/features/UserType";


export const useSuggests = () => {
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [lastPage, setLastPage] = useState(1);

    const [suggests, setSuggests] = useState<UserType[]>([]);

    useEffect(() => {
        axios.get('/api/suggests?page=1')
            .then(response => {
                setSuggests(response.data.paginator.data)
                setLastPage(response.data.paginator.last_page);
            })
            .catch(() => setIsError(true))
            .finally(() => setIsInitialLoading(false));
    }, [])

    const loadMoreSuggests = (page = 1) => {
        setIsLoading(true);

        axios.get(`/api/suggests?page=${page}`)
            .then(response => setSuggests(data => [...data, ...response.data.paginator.data]))
            .catch(() => setIsError(true))
            .finally(() => setIsLoading(false));
    }

    return {
        suggests,
        lastPage,
        isInitialLoading,
        isLoading,
        isError,
        loadMoreSuggests
    }
}