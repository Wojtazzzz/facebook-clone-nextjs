import { Image } from './Image';
import { v4 as uuidv4 } from 'uuid';
import { useImages } from './useImages';

interface UploadedImagesProps {
    images: string[];
}

export const UploadedImages = ({ images }: UploadedImagesProps) => {
    const { currentImages, remove } = useImages(images);

    if (!images.length) return null;

    // eslint-disable-next-line jsx-a11y/alt-text
    const ImagesComponents = currentImages.map((img) => <Image key={uuidv4()} remove={remove} path={img} />);

    return (
        <div
            aria-label="List of already uploaded images"
            className="w-full h-full flex flex-col gap-2 border-1px border-light-100 rounded-xl p-3"
        >
            {ImagesComponents}
        </div>
    );
};
