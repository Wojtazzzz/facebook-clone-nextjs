import { useInfiniteData } from '@hooks/useInfiniteData';
import type { IPost } from '@utils/types';

export const useGetPosts = (queryKey: unknown[], endpoint: string) => {
    return useInfiniteData<IPost>({ queryKey, endpoint });
};
