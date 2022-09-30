import type { IPostUpdatePayload } from '@utils/types';
import { useFormikContext } from 'formik';

export const useUploadImages = () => {
    const { values, setFieldValue } = useFormikContext<IPostUpdatePayload>();

    const cancelUpload = () => {
        setFieldValue('images', []);
    };

    const onDrop = (acceptedFiles: File[]) => {
        setFieldValue('images', [...values.images, ...acceptedFiles]);
    };

    return {
        onDrop,
        cancelUpload,
    };
};
