import { Image } from './Image';

interface ImagesProps {
    images: string[];
}

export const Images = ({ images }: ImagesProps) => {
    if (images.length < 1) return null;

    // eslint-disable-next-line jsx-a11y/alt-text
    const ImagesComponents = images.map((image, i) => <Image key={i} image={image} />);

    return <div className="flex flex-wrap justify-end gap-1">{ImagesComponents}</div>;
};
