import Image from 'next/image';

interface BackgroundProps {
    first_name: string;
    background_image: string;
}

export const Background = ({ first_name, background_image }: BackgroundProps) => {
    return (
        <div className="w-full h-[200px] sm:h-[280px] md:h-[300px] lg:h-[350px] relative">
            <Image
                layout="fill"
                src={background_image}
                alt={`${first_name} User background image`}
                priority
                className="rounded-b-lg"
            />
        </div>
    );
};
