import { SkeletonLoading } from '@components/inc/SkeletonLoading';

export const Loader = () => (
    <div data-testid="hero-friends-loader" className="flex flex-col gap-3">
        <SkeletonLoading classNames="w-[100px] h-[20px]" />

        <div className="flex">
            <SingleAvatarLoader />
            <SingleAvatarLoader />
            <SingleAvatarLoader />
            <SingleAvatarLoader />
            <SingleAvatarLoader />
            <SingleAvatarLoader />
            <SingleAvatarLoader />
            <SingleAvatarLoader />
        </div>
    </div>
);

const SingleAvatarLoader = () => {
    return (
        <div className="-mx-0.5">
            <SkeletonLoading classNames="w-[32px] h-[32px]" isCircle={true} />
        </div>
    );
};
