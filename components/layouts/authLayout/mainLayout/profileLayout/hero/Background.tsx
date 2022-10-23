import Image from 'next/future/image';

interface BackgroundProps {
    firstName: string;
    backgroundImage: string;
}

export const Background = ({ firstName, backgroundImage }: BackgroundProps) => {
    return (
        <div className="w-full h-[200px] sm:h-[280px] md:h-[300px] lg:h-[350px] relative">
            <Image
                priority
                fill
                sizes="(min-width: 1024px) 80vw, 100vw"
                src={backgroundImage}
                alt={`${firstName} user background image`}
                className="w-full h-full rounded-b-lg"
            />
        </div>
    );
};
