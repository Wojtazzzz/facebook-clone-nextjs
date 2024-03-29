import type { IChatMessagePayload } from '@utils/types';
import { useFormikContext } from 'formik';

export const useAddImages = () => {
    const { values, setFieldValue } = useFormikContext<IChatMessagePayload>();

    const onDrop = (acceptedFiles: File[]) => {
        setFieldValue('images', [...values.images, ...acceptedFiles]);
    };

    return {
        onDrop,
    };
};
