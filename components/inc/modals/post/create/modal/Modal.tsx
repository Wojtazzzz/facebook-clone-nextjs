import { ModalRoot } from '@components/inc/ModalRoot';
import { useCreatePostModal } from '../useCreatePostModal';
import { Form } from './form/Form';

interface ModalProps {
    queryKey: unknown[];
}

export const Modal = ({ queryKey }: ModalProps) => {
    const { isActive, close } = useCreatePostModal();

    return (
        <ModalRoot label="Create post modal" isOpen={isActive} title="Create post" closeModal={close}>
            <Form queryKey={queryKey} />
        </ModalRoot>
    );
};
