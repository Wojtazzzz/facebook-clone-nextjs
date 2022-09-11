import { ModalRoot } from '@components/inc/ModalRoot';
import { Content } from './content/Content';

interface UpdateModalProps {
    queryKey: unknown[];
    isActive: boolean;
    postId: number;
    content: string;
    images: string[];
    close: () => void;
}

export const UpdateModal = ({ queryKey, isActive, postId, content, images, close }: UpdateModalProps) => {
    return (
        <ModalRoot label="Update post modal" isOpen={isActive} title="Update post" closeModal={close}>
            <Content queryKey={queryKey} postId={postId} content={content} images={images} closeModal={close} />
        </ModalRoot>
    );
};
