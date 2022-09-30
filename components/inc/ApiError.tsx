import Image from 'next/future/image';

interface ApiErrorProps {
    size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl';
    styles?: string;
}

export const ApiError = ({ size = 'base', styles = '' }: ApiErrorProps) => {
    return (
        <div data-testid="server-error" className={`w-full flex flex-col justify-center items-center my-5 ${styles}`}>
            <Image width={sizes[size].img} height={sizes[size].img} src="/img/not_available.svg" alt="Server error" />

            <div className="flex flex-col items-center text-light-100 font-medium mt-4">
                <span className={`text-${sizes[size].text}`}>Something went wrong</span>
                <span className={`text-${sizes[size].text}`}>Please try again later</span>
            </div>
        </div>
    );
};

const sizes = {
    xs: {
        img: 50,
        text: 'xs',
    },
    sm: {
        img: 80,
        text: 'sm',
    },
    base: {
        img: 110,
        text: 'base',
    },
    lg: {
        img: 140,
        text: 'lg',
    },
    xl: {
        img: 170,
        text: 'xl',
    },
} as const;
