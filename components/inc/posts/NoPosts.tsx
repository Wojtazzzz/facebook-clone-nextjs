import { EmptyList } from '../EmptyList';

interface NoPostsProps {
    queryKey: unknown[];
}

export const NoPosts = ({ queryKey }: NoPostsProps) => {
    if (queryKey.includes('own')) {
        return null;
    }

    return <EmptyList title="No posts, add some friends!" />;
};
