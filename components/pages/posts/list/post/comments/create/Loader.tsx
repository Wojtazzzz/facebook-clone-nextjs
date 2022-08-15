import { SkeletonLoading } from '@components/inc/SkeletonLoading';

interface LoaderProps {
    testId: string;
}

export const Loader = ({ testId }: LoaderProps) => {
    return (
        <div data-testid={testId} className="flex gap-2 p-3">
            <SkeletonLoading classNames="w-[40px] h-[40px]" isCircle />
            <SkeletonLoading classNames="w-full h-[40px]" />
        </div>
    );
};
