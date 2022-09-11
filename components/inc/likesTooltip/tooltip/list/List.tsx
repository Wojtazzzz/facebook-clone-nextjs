import { SpinnerLoader } from '@components/inc/SpinnerLoader';
import type { ILike } from '@utils/types';
import { ApiError } from './ApiError';
import { EmptyList } from './EmptyList';
import { Like } from './Like';

interface ListProps {
    data: ILike[] | undefined;
    isLoading: boolean;
    isError: boolean;
}

export const List = ({ data, isLoading, isError }: ListProps) => {
    if (isLoading) return <SpinnerLoader testId="tooltip-spinner" spinnerStyles="w-4 mx-auto" />;
    if (isError) return <ApiError />;
    if (!data?.length) return <EmptyList />;

    const LikeComponents = data.map((like, i) => {
        if (i >= maxCount) return;

        return <Like key={like.id} name={like.author.name} />;
    });

    const isMore = data.length > maxCount;

    return (
        <div className="flex flex-col">
            {LikeComponents}
            {isMore && <span className="text-xs text-light-100">and {data.length - maxCount} more...</span>}
        </div>
    );
};

const maxCount = 12;
