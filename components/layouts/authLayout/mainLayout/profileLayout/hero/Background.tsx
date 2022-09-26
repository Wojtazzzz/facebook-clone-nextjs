import Image from 'next/image';

interface BackgroundProps {
    firstName: string;
    backgroundImage: string;
}

export const Background = ({ firstName, backgroundImage }: BackgroundProps) => {
    return (
        <div className="w-full h-[200px] sm:h-[280px] md:h-[300px] lg:h-[350px] relative">
            <Image
                layout="fill"
                src={backgroundImage}
                alt={`${firstName} user background image`}
                className="rounded-b-lg"
            />
        </div>
    );
};
