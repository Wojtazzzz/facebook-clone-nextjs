import type { IPostPayload } from '@utils/types';
import { useFormikContext } from 'formik';

export const useUpload = () => {
    const { values, setFieldValue } = useFormikContext<IPostPayload>();

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
