import Image from 'next/image';

interface AvatarProps {
    src: string;
    size: string | number;
    alt: string;
    styles?: string;
    title?: string;
}

export const Avatar = ({ src, size, alt, title, styles }: AvatarProps) => {
    return (
        <div className={`flex justify-center items-center ${styles}`}>
            <Image src={src} width={size} height={size} alt={alt} title={title} className="rounded-full" />
        </div>
    );
};
