import { Images } from './images/Images';
import { Text } from './Text';

interface ContentProps {
    content: string;
    images: string[];
}

export const Content = ({ content, images }: ContentProps) => {
    return (
        <div className="w-full pt-3">
            <Text content={content} />
            <Images images={images} />
        </div>
    );
};
