import { SkeletonLoading } from '@components/inc/SkeletonLoading';

export const Loader = () => {
    return (
        <div data-testid="createPost-loader" className="w-full flex gap-3 bg-dark-200 rounded-lg p-3">
            <SkeletonLoading classNames="w-[55px] h-[50px]" isCircle />
            <SkeletonLoading classNames="w-full p-2" />
        </div>
    );
};
