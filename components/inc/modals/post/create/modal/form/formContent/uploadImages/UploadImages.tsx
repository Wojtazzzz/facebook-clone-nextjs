import { ImageDrop } from './imageDrop/ImageDrop';
import { ImagesList } from './imagesList/ImagesList';

interface UploadImagesProps {
    close: () => void;
}

export const UploadImages = ({ close }: UploadImagesProps) => {
    return (
        <div className="mb-4">
            <ImageDrop close={close} />
            <ImagesList />
        </div>
    );
};
