import { useEffect, useState } from "react";

import axios from "@lib/axios";

import type { FriendType } from "@ctypes/features/FriendType";


export const useFriends = () => {
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [lastPage, setLastPage] = useState(1);

    const [friends, setFriends] = useState<FriendType[]>([]);

    useEffect(() => {
        axios.get('/api/friends?page=1')
            .then(response => {
                setFriends(response.data.paginator.data)
                setLastPage(response.data.paginator.last_page);
            })
            .catch(() => setIsError(true))
            .finally(() => setIsInitialLoading(false));
    }, [])

    const loadMoreFriends = (page = 1) => {
        setIsLoading(true);

        axios.get(`/api/friends?page=${page}`)
            .then(response => setFriends(data => [...data, ...response.data.paginator.data]))
            .catch(() => setIsError(true))
            .finally(() => setIsLoading(false));
    }

    return {
        friends,
        lastPage,
        isInitialLoading,
        isLoading,
        isError,
        loadMoreFriends
    }
}