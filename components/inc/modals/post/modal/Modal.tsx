import { ModalRoot } from '@components/inc/ModalRoot';
import { Content } from './content/Content';
import { useCreatePostModal } from '../useCreatePostModal';

export const Modal = () => {
    const { isActive, close } = useCreatePostModal();

    return (
        <ModalRoot label="Create post modal" isOpen={isActive} title="Create post" closeModal={close}>
            <Content />
        </ModalRoot>
    );
};
