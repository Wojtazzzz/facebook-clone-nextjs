import { MoreImages } from './moreImages/MoreImages';
import { SingleImage } from './SingleImage';

interface ShowGalleryProps {
    images: string[];
    open: () => void;
}

export const ShowGallery = ({ images, open }: ShowGalleryProps) => {
    return (
        <button aria-label="Show gallery" className="w-full flex gap-1 mt-3" onClick={open}>
            {images.length === 1 ? <SingleImage image={images[0]} /> : <MoreImages images={images} />}
        </button>
    );
};
