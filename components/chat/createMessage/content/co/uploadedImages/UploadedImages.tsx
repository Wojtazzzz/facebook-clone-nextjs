import type { IChatMessagePayload } from '@utils/types';
import { useFormikContext } from 'formik';
import { Image } from './Image';
import { v4 as uuid } from 'uuid';

export const UploadedImages = () => {
    const { values } = useFormikContext<IChatMessagePayload>();

    if (values.images.length < 1) {
        return null;
    }

    // eslint-disable-next-line jsx-a11y/alt-text
    const ImagesComponents = values.images.map((image) => <Image key={uuid()} image={image} />);

    return (
        <div data-testid="chat-uploadedImages" className="flex gap-2 p-2">
            {ImagesComponents}
        </div>
    );
};
