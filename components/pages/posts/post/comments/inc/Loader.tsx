import { SpinnerLoader } from '@components/inc/SpinnerLoader';

interface LoaderProps {
    testId?: string;
}

export const Loader = ({ testId }: LoaderProps) => {
    return (
        <div data-testid={testId} className="w-full flex justify-center py-2">
            <SpinnerLoader spinnerStyles="w-6" />;
        </div>
    );
};
