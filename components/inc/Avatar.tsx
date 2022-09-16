import Image from 'next/image';

interface AvatarProps {
    src: string;
    alt: string;
    styles?: string;
    title?: string;
}

export const Avatar = ({ src, alt, title, styles }: AvatarProps) => {
    return (
        <div className={`flex justify-center relative items-center ${styles}`}>
            <Image src={src} layout="fill" alt={alt} title={title} className="rounded-full" />
        </div>
    );
};
