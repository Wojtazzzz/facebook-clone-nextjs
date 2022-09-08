import { ModalRoot } from '@components/inc/ModalRoot';
import { Content } from './content/Content';

interface UpdateModalProps {
    isActive: boolean;
    postId: number;
    content: string;
    images: string[];
    close: () => void;
}

export const UpdateModal = ({ isActive, postId, content, images, close }: UpdateModalProps) => {
    return (
        <ModalRoot label="Update post modal" isOpen={isActive} title="Update post" closeModal={close}>
            <Content postId={postId} content={content} images={images} closeModal={close} />
        </ModalRoot>
    );
};
