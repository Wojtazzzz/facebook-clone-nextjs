import { SpinnerLoader } from '@components/inc/SpinnerLoader';

export const Loader = () => {
    return (
        <div className="w-full flex justify-center items-center">
            <SpinnerLoader containerStyles="w-12" />
        </div>
    );
};
