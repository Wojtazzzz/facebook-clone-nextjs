import type { IPostUpdatePayload } from '@utils/types';
import { useFormikContext } from 'formik';
import { useState } from 'react';

export const useImages = (images: string[]) => {
    const [currentImages, setCurrentImages] = useState(images);
    const { setValues } = useFormikContext<IPostUpdatePayload>();

    const remove = (img: string) => {
        setCurrentImages((prevImages) => prevImages.filter((image) => image !== img));

        const imgToDelete = images.find((image) => image === img);

        if (imgToDelete) {
            setValues((prevValues) => ({
                ...prevValues,
                imagesToDelete: [imgToDelete, ...prevValues.imagesToDelete],
            }));
        }
    };

    return {
        currentImages,
        remove,
    };
};
