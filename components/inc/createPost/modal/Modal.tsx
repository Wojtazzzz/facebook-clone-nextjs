import type { QueryKey } from '@tanstack/react-query';
import { Form } from './form/Form';
import { Modal as RootModal } from '../../modal/Modal';

interface ModalProps {
    queryKey: QueryKey;
    close: () => void;
}

export const Modal = ({ queryKey, close }: ModalProps) => {
    return (
        <RootModal close={close} title="Create Post">
            <Form queryKey={queryKey} close={close} />
        </RootModal>
    );
};
