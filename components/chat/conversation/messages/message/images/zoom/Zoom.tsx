import { getStoredImagePath } from '@utils/getStoredImagePath';
import Image from 'next/future/image';
import { Close } from './Close';

interface ZoomProps {
    image: string;
    close: () => void;
}

export const Zoom = ({ image, close }: ZoomProps) => {
    return (
        <div
            aria-label="Zoom"
            className="w-screen h-screen flex justify-center items-center fixed top-0 left-0 z-50 bg-no-repeat bg-cover overflow-hidden"
            style={{ backgroundImage: `url(${getStoredImagePath(image)})` }}
        >
            <Close close={close} />

            <div className="w-full h-full backdrop-blur-2xl">
                <div className="w-4/5 md:w-2/3 h-full flex justify-center relative z-[51] mx-auto">
                    <Image fill sizes="66vw" src={getStoredImagePath(image)} alt="" className="w-full h-full z-50" />
                </div>
            </div>
        </div>
    );
};
