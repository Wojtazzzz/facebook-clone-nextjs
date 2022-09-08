import { Form } from './form/Form';

interface ContentProps {
    postId: number;
    content: string;
    images: string[];
    closeModal: () => void;
}

export const Content = ({ postId, content, images, closeModal }: ContentProps) => {
    return (
        <div className="p-4">
            <Form postId={postId} content={content} images={images} closeModal={closeModal} />
        </div>
    );
};
