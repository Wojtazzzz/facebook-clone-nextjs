import { ImageDrop } from './imageDrop/ImageDrop';
import { ImagesList } from './imagesList/ImagesList';

interface UploadImagesProps {
    close: () => void;
}

export const UploadImages = ({ close }: UploadImagesProps) => {
    return (
        <>
            <ImageDrop close={close} />
            <ImagesList />
        </>
    );
};
