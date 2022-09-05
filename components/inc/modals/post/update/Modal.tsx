import { ModalRoot } from '@components/inc/ModalRoot';
import { Content } from './content/Content';
import { useUpdatePostModal } from './useUpdatePostModal';

export const Modal = () => {
    const { isActive, close } = useUpdatePostModal();

    return (
        <ModalRoot label="Update post modal" isOpen={isActive} title="Update post" closeModal={close}>
            <Content />
        </ModalRoot>
    );
};
