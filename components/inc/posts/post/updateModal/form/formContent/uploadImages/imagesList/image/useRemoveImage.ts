import type { IPostCreatePayload } from '@utils/types';
import { useFormikContext } from 'formik';

export const useRemoveImage = () => {
    const { values, setFieldValue } = useFormikContext<IPostCreatePayload>();

    const remove = (file: File) => {
        const newImages = values.images.filter((img) => img !== file);

        setFieldValue('images', newImages);
    };

    return {
        remove,
    };
};
