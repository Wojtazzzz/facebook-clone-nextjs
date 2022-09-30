import { useFormikContext } from 'formik';
import { Image } from './image/Image';
import { v4 as uuidv4 } from 'uuid';
import type { IPostCreatePayload } from '@utils/types';

export const ImagesList = () => {
    const {
        values: { images },
    } = useFormikContext<IPostCreatePayload>();

    if (!images.length) return null;

    // eslint-disable-next-line jsx-a11y/alt-text
    const ImagesComponents = images.map((img) => <Image key={uuidv4()} image={img} />);

    return (
        <div data-testid="uploaded-images">
            <h5 className="text-light-100 font-medium">Uploaded images: {images.length}</h5>

            <ul aria-label="List of uploaded images" className="list-disc mb-4">
                {ImagesComponents}
            </ul>
        </div>
    );
};
