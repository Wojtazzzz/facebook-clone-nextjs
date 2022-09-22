import { useInfiniteQuery } from '@tanstack/react-query';
import { axios } from '@libs/axios';
import type { IPaginatedResponse } from '@utils/types';

export const useInfiniteData = <T>({ queryKey, endpoint, params, options }: IUseInfiniteDataArgs) => {
    const { data, isSuccess, ...rest } = useInfiniteQuery(
        queryKey,
        ({ pageParam = 1 }) => queryFn<T>(endpoint, params, pageParam),
        {
            getPreviousPageParam: (_, pages) => pages[pages.length - 1].prev_page,
            getNextPageParam: (_, pages) => pages[pages.length - 1].next_page,
            ...options,
        }
    );

    const flatData = [];

    if (isSuccess) {
        flatData.push(...data.pages.flatMap((page) => page.data));
    }

    const isEmpty = flatData.length < 1;

    return {
        data: flatData,
        isEmpty,
        ...rest,
    };
};

type IUseInfiniteDataArgs = {
    queryKey: unknown[];
    endpoint: string;
    params?: {};
    options?: {};
};

const queryFn = <T>(endpoint: string, params = {}, pageParam: number) =>
    axios
        .get<IPaginatedResponse<T>>(endpoint, { params: { ...params, page: pageParam } })
        .then((response) => response.data);
