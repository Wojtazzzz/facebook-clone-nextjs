import { useEffect, useState } from "react";

import axios from "@lib/axios";


export const useInvites = () => {
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [lastPage, setLastPage] = useState(1);

    const [invites, setInvites] = useState<any>([]);

    useEffect(() => {
        axios.get('/api/invites?page=1')
            .then(response => {
                setInvites(response.data.paginator.data)
                setLastPage(response.data.paginator.last_page);
            })
            .catch(() => setIsError(true))
            .finally(() => setIsInitialLoading(false));
    }, [])

    const loadMoreInvites = (page = 1) => {
        setIsLoading(true);

        axios.get(`/api/invites?page=${page}`)
            .then(response => setInvites((data: any) => [...data, ...response.data.paginator.data]))
            .catch(() => setIsError(true))
            .finally(() => setIsLoading(false));
    }

    return {
        invites,
        lastPage,
        isInitialLoading,
        isLoading,
        isError,
        loadMoreInvites
    }
}