import { SkeletonLoading } from '@components/inc/SkeletonLoading';

export const Loader = () => {
    return (
        <div data-testid="commentsCreate-loader" className="flex gap-2 p-3">
            <SkeletonLoading classNames="w-[40px] h-[40px]" isCircle />
            <SkeletonLoading classNames="w-full h-[40px]" />
        </div>
    );
};
