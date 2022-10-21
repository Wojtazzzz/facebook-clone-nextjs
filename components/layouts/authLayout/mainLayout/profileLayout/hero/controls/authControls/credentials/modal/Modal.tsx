import { AuthData } from './authData/AuthData';
import { Modal as RootModal } from '@components/inc/modal/Modal';

interface ModalProps {
    close: () => void;
}

export const Modal = ({ close }: ModalProps) => {
    return (
        <RootModal title="Auth Credentials" close={close}>
            <AuthData />
        </RootModal>
    );
};
