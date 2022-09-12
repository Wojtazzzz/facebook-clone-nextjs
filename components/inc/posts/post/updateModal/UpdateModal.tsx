import { ModalRoot } from '@components/inc/ModalRoot';
import { Form } from './form/Form';

interface UpdateModalProps {
    queryKey: unknown[];
    isActive: boolean;
    postId: number;
    content: string;
    images: string[];
    close: () => void;
}

export const UpdateModal = ({ isActive, close, ...rest }: UpdateModalProps) => {
    return (
        <ModalRoot label="Update post modal" isOpen={isActive} title="Update post" closeModal={close}>
            <Form {...rest} closeModal={close} />
        </ModalRoot>
    );
};
