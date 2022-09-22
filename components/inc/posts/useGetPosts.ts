import { useInfiniteData } from '@hooks/useInfiniteData';
import type { QueryKey } from '@tanstack/react-query';
import type { IPost } from '@utils/types';

export const useGetPosts = (queryKey: QueryKey, endpoint: string) => {
    return useInfiniteData<IPost>({ queryKey, endpoint });
};
