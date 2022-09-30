import { ListLoader } from '@components/inc/ListLoader';
import { SkeletonLoading } from '@components/inc/SkeletonLoading';
import { useRandomWidth } from '@hooks/useRandomWidth';

export const Loader = () => {
    return (
        <ListLoader
            testId="friends-loader"
            count={6}
            styles="flex flex-col md:flex-row md:flex-wrap items-center justify-center md:justify-start"
            childStyles="w-[80%] md:w-[50%] max-w-[450px] md:max-w-none min-w-[300px] sm:min-w-[320px]"
        >
            <SingleLoader />
        </ListLoader>
    );
};

const SingleLoader = () => {
    const { width } = useRandomWidth(60, 140);

    return (
        <div
            data-testid="loading"
            className="flex items-center gap-3 m-1.5 py-2 md:py-4 px-3 md:px-5 border-dark-100 border-[1px] border-opacity-30 rounded-xl"
        >
            <div className="flex justify-center items-center relative w-[60px] h-[60px] md:w-[80px] md:h-[80px] rounded-xl">
                <SkeletonLoading classNames="w-full h-full" />
            </div>

            <SkeletonLoading styles={{ width }} classNames="h-[16px]" />
        </div>
    );
};
