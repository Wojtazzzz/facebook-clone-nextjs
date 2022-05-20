import Image from 'next/image';

import { apiErrorStylesProps as stylesProps } from '@constants/ApiErrorStylesProps';

interface ApiErrorProps {
    size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl';
    styles?: string;
}

export const ApiError = ({ size = 'base', styles = '' }: ApiErrorProps) => {
    return (
        <div className={`w-full flex flex-col justify-center items-center my-5 ${styles}`}>
            <Image
                width={stylesProps[size].img}
                height={stylesProps[size].img}
                src="/img/not_available.svg"
                alt="Server error"
            />

            <div className="flex flex-col items-center text-light-100 font-medium mt-4">
                <span className={`text-${stylesProps[size].text}`}>Something went wrong</span>
                <span className={`text-${stylesProps[size].text}`}>Please try again later</span>
            </div>
        </div>
    );
};
