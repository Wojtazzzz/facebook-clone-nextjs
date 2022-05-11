import { SpinnerLoader } from '@components/inc/SpinnerLoader';

interface LoaderProps {
    testid: string;
}

export const Loader = ({ testid }: LoaderProps) => {
    return (
        <div data-testid={testid} className="w-full flex justify-center py-2">
            <SpinnerLoader spinnerStyles="w-6" />;
        </div>
    );
};
