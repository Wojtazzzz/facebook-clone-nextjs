import Image from 'next/image';

interface AvatarProps {
    src: string;
    size: string | number;
    alt: string;
}

export const Avatar = ({ src, size, alt }: AvatarProps) => {
    return (
        <div className={`flex justify-center items-center w-[${size}px] h-[${size}px]`}>
            <Image src={src} width={size} height={size} alt={alt} className="rounded-full" />
        </div>
    );
};
