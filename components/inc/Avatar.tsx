import Image from 'next/future/image';

interface AvatarProps {
    testId?: string;
    src: string;
    alt: string;
    styles?: string;
    title?: string;
}

export const Avatar = ({ testId, src, alt, title, styles }: AvatarProps) => {
    return (
        <div data-testid={testId} className={`flex justify-center relative items-center ${styles}`}>
            <Image src={src} fill alt={alt} title={title} className="w-full h-full rounded-full" />
        </div>
    );
};
