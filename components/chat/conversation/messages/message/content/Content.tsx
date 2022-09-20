import { Images } from '../images/Images';
import { Text } from '../Text';

interface ContentProps {
    content?: string;
    images: string[];
    createdAt: string;
    isReceived: boolean;
}

export const Content = ({ content, images, createdAt, isReceived }: ContentProps) => {
    return (
        <div className="flex flex-col gap-1">
            <Text text={content} createdAt={createdAt} isReceived={isReceived} />
            <Images images={images} />
        </div>
    );
};
