import { useEffect, useState } from "react";
import useSWRInfinite from 'swr/infinite'

import axios from "@lib/axios";
import { FriendsLists } from "@enums/FriendsType";

import type { UserType } from "@ctypes/features/UserType";


export const useFriends = (type: FriendsLists) => {
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const getKey = (pageIndex: number, previousPageData: []) => {
        if (previousPageData && !previousPageData.length) return null;

        switch (type) {
            case FriendsLists.SUGGEST:
                return `/api/suggests?page=${++pageIndex}`;

            case FriendsLists.INVITES:
                return `/api/invites?page=${++pageIndex}`;

            default:
            case FriendsLists.FRIENDS:
                return `/api/friends?page=${++pageIndex}`;
        }
    }

    const fetcher = (url: string) => axios.get(url)
        .then(response => response.data.paginator.data)
        .catch(() => setIsError(true))
        .finally(() => setIsInitialLoading(false));


    // Fetching data
    const { data, size, setSize } = useSWRInfinite<UserType[]>(getKey, fetcher);


    useEffect(() => {
        if (!data) return;

        if (data.length > 0) {
            setIsInitialLoading(false)
        }

        setIsLoading(false);
    }, [data]);

    const loadMore = () => {
        setIsLoading(true);
        setSize(size + 1);
    }

    return {
        data: data ?? [],
        isInitialLoading,
        isLoading,
        isError,
        size,
        setSize,
        loadMore
    }
}