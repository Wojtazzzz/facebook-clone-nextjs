import { Gallery } from './gallery/Gallery';
import { useGallery } from './useGallery';
import { ShowGallery } from './showGallery/ShowGallery';

interface ImagesProps {
    images: string[];
}

export const Images = ({ images }: ImagesProps) => {
    const { isActive, open, close } = useGallery();

    if (!images.length) return null;

    return (
        <>
            <ShowGallery images={images} open={open} />

            {isActive && <Gallery images={images} closeGallery={close} />}
        </>
    );
};
