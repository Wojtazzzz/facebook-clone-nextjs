import { Form } from './form/Form';
import type { QueryKey } from '@tanstack/react-query';
import { Modal } from '@components/inc/modal/Modal';

interface UpdateModalProps {
    queryKey: QueryKey;
    postId: number;
    content: string;
    images: string[];
    close: () => void;
}

export const UpdateModal = ({ close, ...rest }: UpdateModalProps) => {
    return (
        <Modal title="Update Modal" close={close}>
            <Form {...rest} closeModal={close} />
        </Modal>
    );
};
