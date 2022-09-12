import { Button } from '@components/inc/Button';
import { SpinnerLoader } from '@components/inc/SpinnerLoader';
import { ToggleFilesUpload } from './ToggleFilesUpload';
import { ErrorMessage } from './ErrorMessage';
import { Textarea } from './Textarea';
import { UploadFiles } from './uploadFiles/UploadFiles';
import { useUploadActive } from './useUploadActive';
import { UploadedFiles } from './uploadedFiles/UploadedFiles';

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

            {isUploadActive && <UploadFiles close={closeUpload} />}

            <ErrorMessage error={error} />

            <ToggleFilesUpload toggle={toggleUpload} />

            <UploadedFiles images={images} />

            <Button type="submit" title="Update post" isDisabled={isLoading} styles="w-full mt-5" />
        </div>
    );
};
