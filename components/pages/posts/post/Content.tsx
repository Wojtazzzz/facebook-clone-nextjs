import { Images } from '@components/pages/posts/post/inc/Images';

interface ContentProps {
    content?: string;
    images?: string[];
}

export const Content = ({ content, images }: ContentProps) => {
    return (
        <div className="w-full pt-3">
            {!!content && (
                <section aria-label="Content" className="px-4">
                    <span className="text-light-100 tracking-tight">{content}</span>
                </section>
            )}

            {!!images?.length && <Images images={images} />}
        </div>
    );
};
