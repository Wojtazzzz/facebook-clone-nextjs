import { ModalRoot } from '@components/inc/ModalRoot';
import type { QueryKey } from '@tanstack/react-query';
import { Form } from './form/Form';

interface ModalProps {
    isActive: boolean;
    queryKey: QueryKey;
    close: () => void;
}

export const Modal = ({ isActive, queryKey, close }: ModalProps) => {
    return (
        <ModalRoot label="Create post modal" isOpen={isActive} title="Create post" closeModal={close}>
            <Form queryKey={queryKey} close={close} />
        </ModalRoot>
    );
};
