import SkeletonLoader from 'tiny-skeleton-loader-react';

interface SkeletonLoadingProps {
    classNames?: string;
    styles?: {};
    isCircle?: boolean;
}

export const SkeletonLoading = ({ classNames = '', styles = {}, isCircle = false }: SkeletonLoadingProps) => {
    return (
        <div className={`${classNames} transition-width duration-500`} style={styles}>
            <SkeletonLoader background="#242526" width="100%" height="100%" circle={isCircle} />
        </div>
    );
};
