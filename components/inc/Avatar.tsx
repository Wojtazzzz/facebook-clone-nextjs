import Image from 'next/future/image';

interface AvatarProps {
    src: string;
    alt: string;
    styles?: string;
    title?: string;
}

export const Avatar = ({ src, alt, title, styles }: AvatarProps) => {
    return (
        <div className={`flex justify-center relative items-center ${styles}`}>
            <Image src={src} fill alt={alt} title={title} className="w-full h-full rounded-full" />
        </div>
    );
};
