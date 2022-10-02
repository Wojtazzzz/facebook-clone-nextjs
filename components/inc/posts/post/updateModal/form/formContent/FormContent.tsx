import { Button } from '@components/inc/Button';
import { SpinnerLoader } from '@components/inc/SpinnerLoader';
import { ToggleImagesUpload } from './ToggleImagesUpload';
import { ErrorMessage } from './ErrorMessage';
import { Textarea } from './Textarea';
import { UploadImages } from './uploadImages/UploadImages';
import { useUploadActive } from './useUploadActive';
import { UploadedImages } from './uploadedImages/UploadedImages';

interface FormContentProps {
    isLoading: boolean;
    images: string[];
    error: unknown;
}

export const FormContent = ({ isLoading, images, error }: FormContentProps) => {
    const { isUploadActive, closeUpload, toggleUpload } = useUploadActive();

    // Don't move to parent component
    // It will remove all values from Formik context when submit
    if (isLoading) return <SpinnerLoader testId="updatePost-loader" containerStyles="w-[100px] my-10 mx-auto" />;

    return (
        <div className="m-3">
            <Textarea />

            {isUploadActive && <UploadImages close={closeUpload} />}

            <ErrorMessage error={error} />

            <ToggleImagesUpload isUploadActive={isUploadActive} toggle={toggleUpload} />

            <UploadedImages images={images} />

            <Button type="submit" title="Update post" isLoading={isLoading} styles="w-full mt-5" />
        </div>
    );
};
