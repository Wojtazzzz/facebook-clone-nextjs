import { SpinnerLoader } from '@components/inc/SpinnerLoader';

interface LoaderProps {
    testId?: string;
}

export const Loader = ({ testId = '' }: LoaderProps) => {
    return <SpinnerLoader testId={testId} containerStyles="my-2" spinnerStyles="w-5 h-5" />;
};
