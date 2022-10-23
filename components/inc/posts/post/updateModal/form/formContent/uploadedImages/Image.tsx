import { RoundedButton } from '@components/inc/RoundedButton';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { getStoredImagePath } from '@utils/getStoredImagePath';
import NextImage from 'next/future/image';

interface ImageProps {
    remove: (img: string) => void;
    path: string;
}

export const Image = ({ path, remove }: ImageProps) => {
    const handleRemove = () => {
        remove(path);
    };

    return (
        <div
            aria-label="Uploaded image"
            className="w-full h-[300px] relative transition hover:brightness-110 cursor-pointer"
        >
            <NextImage fill sizes="300px" src={getStoredImagePath(path)} alt="" />

            <RoundedButton
                label="Remove image"
                icon={faTimes}
                styles="bg-dark-100 hover:bg-dark-100/90 absolute top-2 right-2"
                callback={handleRemove}
            />
        </div>
    );
};
