import { getStoredImagePath } from '@utils/getStoredImagePath';
import clsx from 'clsx';
import Image from 'next/future/image';

interface ThumbProps {
    image: string;
    isActive: boolean;
    index: number;
    slideTo: () => void;
}

export const Thumb = ({ image, isActive, index, slideTo }: ThumbProps) => {
    return (
        <li className="w-[36px] h-[36px] relative">
            <button type="button" aria-label={`Go to ${index} slide`} aria-pressed={isActive} onClick={slideTo}>
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
