import { useState } from 'react';
import Image from 'next/image';
import { getStoredImagePath } from '@utils/getStoredImagePath';
import { Gallery } from './gallery/Gallery';

interface ImagesProps {
    images?: string[];
}

export const Images = ({ images }: ImagesProps) => {
    const [isGalleryActive, setIsGalleryActive] = useState(false);

    const handleToggleGallery = () => setIsGalleryActive((prevState) => !prevState);

    if (!!!images?.length) {
        return null;
    }

    return (
        <>
            <section aria-label="Images" className="w-full flex gap-1 mt-3" onClick={handleToggleGallery}>
                {images.length === 1 ? (
                    <div className="w-full min-h-[300px] relative transition hover:brightness-110 cursor-pointer">
                        <Image layout="fill" src={getStoredImagePath(images[0])} alt="" objectFit="cover" />
                    </div>
                ) : (
                    <>
                        <div className="w-1/2 min-h-[300px] relative transition hover:brightness-110 cursor-pointer">
                            <Image layout="fill" src={getStoredImagePath(images[0])} alt="" objectFit="cover" />
                        </div>

                        <div className="w-1/2 min-h-[300px] relative transition hover:brightness-110 cursor-pointer">
                            <Image layout="fill" src={getStoredImagePath(images[1])} alt="" objectFit="cover" />

                            {images.length >= 3 && (
                                <div className="group w-full h-full flex justify-center items-center absolute top-0 left-0 bg-gray-600 bg-opacity-40">
                                    <span className="text-3xl text-white">+{images.length - 2}</span>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </section>

            {isGalleryActive && <Gallery images={images} closeGallery={handleToggleGallery} />}
        </>
    );
};
