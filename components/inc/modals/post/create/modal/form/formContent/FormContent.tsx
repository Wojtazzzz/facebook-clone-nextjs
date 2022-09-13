import { Button } from '@components/inc/Button';
import { SpinnerLoader } from '@components/inc/SpinnerLoader';
import { ToggleFilesUpload } from './ToggleFilesUpload';
import { ErrorMessage } from './ErrorMessage';
import { Textarea } from './Textarea';
import { UploadFiles } from './uploadFiles/UploadFiles';
import { useUploadActive } from './useUploadActive';

interface FormContentProps {
    isLoading: boolean;
    error: unknown;
}

export const FormContent = ({ isLoading, error }: FormContentProps) => {
    const { isUploadActive, closeUpload, toggleUpload } = useUploadActive();

    // Not move to parent component
    // It will remove all values from Formik when submit
    if (isLoading) return <SpinnerLoader testId="createPost-loader" containerStyles="w-[100px] my-10 mx-auto" />;

    return (
        <div className="m-3">
            <Textarea />

            {isUploadActive && <UploadFiles close={closeUpload} />}

            <ErrorMessage error={error} />

            <ToggleFilesUpload toggle={toggleUpload} />

            <Button type="submit" title="Create post" isDisabled={isLoading} styles="w-full mt-5" />
        </div>
    );
};