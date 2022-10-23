import { getStoredImagePath } from '@utils/getStoredImagePath';
import Image from 'next/future/image';
import { Overlay } from './Overlay';

interface MoreImagesProps {
    images: string[];
}

export const MoreImages = ({ images }: MoreImagesProps) => {
    return (
        <>
            <div className="w-1/2 min-h-[300px] relative transition hover:brightness-110 cursor-pointer">
                <Image fill sizes="350px" className="object-cover" src={getStoredImagePath(images[0])} alt="" />
            </div>

            <div className="w-1/2 min-h-[300px] relative transition hover:brightness-110 cursor-pointer">
                <Image fill sizes="350px" className="object-cover" src={getStoredImagePath(images[1])} alt="" />

                <Overlay length={images.length} />
            </div>
        </>
    );
};
