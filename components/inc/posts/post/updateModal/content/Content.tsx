import { Form } from './form/Form';

interface ContentProps {
    queryKey: unknown[];
    postId: number;
    content: string;
    images: string[];
    closeModal: () => void;
}

export const Content = ({ queryKey, postId, content, images, closeModal }: ContentProps) => {
    return (
        <div className="p-4">
            <Form queryKey={queryKey} postId={postId} content={content} images={images} closeModal={closeModal} />
        </div>
    );
};
