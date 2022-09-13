import { getStoredImagePath } from '@utils/getStoredImagePath';
import Image from 'next/image';
import { Overlay } from './Overlay';

interface MoreImagesProps {
    images: string[];
}

export const MoreImages = ({ images }: MoreImagesProps) => {
    return (
        <>
            <div className="w-1/2 min-h-[300px] relative transition hover:brightness-110 cursor-pointer">
                <Image layout="fill" src={getStoredImagePath(images[0])} alt="" objectFit="cover" />
            </div>

            <div className="w-1/2 min-h-[300px] relative transition hover:brightness-110 cursor-pointer">
                <Image layout="fill" src={getStoredImagePath(images[1])} alt="" objectFit="cover" />

                <Overlay length={images.length} />
            </div>
        </>
    );
};
