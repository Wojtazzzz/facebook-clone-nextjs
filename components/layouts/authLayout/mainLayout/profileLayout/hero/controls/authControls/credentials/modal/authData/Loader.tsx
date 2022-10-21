import { SkeletonLoading } from '@components/inc/SkeletonLoading';

export const Loader = () => {
    return (
        <div data-testid="credentialsModal-header" className="flex flex-col gap-1">
            <SingleLoader nameWidth="w-[120px]" valueWidth="w-[80px]" />
            <SingleLoader nameWidth="w-[98px]" valueWidth="w-[88px]" />
        </div>
    );
};

type IWidthClass = `w-[${number}px]`;

interface SingleLoaderProps {
    nameWidth: IWidthClass;
    valueWidth: IWidthClass;
}

const SingleLoader = ({ nameWidth, valueWidth }: SingleLoaderProps) => {
    return (
        <div className="w-full flex justify-between gap-1 text-lg">
            <SkeletonLoading classNames={`${nameWidth} h-[18px]`} />
            <SkeletonLoading classNames={`${valueWidth} h-[18px]`} />
        </div>
    );
};
