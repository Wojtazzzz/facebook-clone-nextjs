import { getStoredImagePath } from '@utils/getStoredImagePath';
import clsx from 'clsx';
import Image from 'next/future/image';

interface ThumbProps {
    image: string;
    isActive: boolean;
    slideTo: () => void;
}

export const Thumb = ({ image, isActive, slideTo }: ThumbProps) => {
    return (
        <li className="w-[36px] h-[36px] relative">
            <button type="button" onClick={slideTo}>
                <Image
                    fill
                    src={getStoredImagePath(image)}
                    className={clsx(
                        'hover:opacity-100 transition-opacity rounded-lg shadow-md',
                        isActive ? 'opacity-100' : 'opacity-60'
                    )}
                    alt=""
                />
            </button>
        </li>
    );
};
