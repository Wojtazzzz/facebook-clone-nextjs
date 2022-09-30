import { Button } from '@components/inc/Button';
import { SpinnerLoader } from '@components/inc/SpinnerLoader';
import { ToggleImagesUpload } from './ToggleImagesUpload';
import { ErrorMessage } from './ErrorMessage';
import { Textarea } from './Textarea';
import { UploadImages } from './uploadImages/UploadImages';
import { useUploadActive } from './useUploadActive';

interface FormContentProps {
    isLoading: boolean;
    error: unknown;
}

export const FormContent = ({ isLoading, error }: FormContentProps) => {
    const { isUploadActive, closeUpload, toggleUpload } = useUploadActive();

    // Not move to parent component
    // Because it will remove all values from Formik when submit
    if (isLoading)
        return <SpinnerLoader testId="createPost-loader" containerStyles="w-[64px] md:w-[80px] my-10 mx-auto" />;

    return (
        <div className="m-1 md:m-3">
            <Textarea />

            {isUploadActive && <UploadImages close={closeUpload} />}

            <ToggleImagesUpload toggle={toggleUpload} />

            <ErrorMessage error={error} />

            <Button type="submit" title="Create post" isLoading={isLoading} styles="w-full mt-5" />
        </div>
    );
};
