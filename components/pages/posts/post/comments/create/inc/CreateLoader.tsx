import { SkeletonLoading } from '@components/inc/SkeletonLoading';

interface CreateLoaderProps {
    testId: string;
}

export const CreateLoader = ({ testId }: CreateLoaderProps) => {
    return (
        <div data-testid={testId} className="flex gap-2 p-3">
            <SkeletonLoading classNames="w-[40px] h-[40px]" isCircle />
            <SkeletonLoading classNames="w-full h-[40px]" />
        </div>
    );
};
