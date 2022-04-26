import { Images } from '@components/pages/posts/post/inc/Images';

interface ContentProps {
    content: string;
    images?: string[];
}

export const Content = ({ content, images }: ContentProps) => {
    return (
        <div className="w-full py-3">
            <div className="px-4">
                <span className="text-light-100">{content}</span>
            </div>

            {!!images?.length && <Images images={images} />}
        </div>
    );
};
