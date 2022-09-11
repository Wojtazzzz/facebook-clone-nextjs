import { ModalRoot } from '@components/inc/ModalRoot';
import { Content } from './content/Content';
import { useCreatePostModal } from '../useCreatePostModal';

interface ModalProps {
    queryKey: unknown[];
}

export const Modal = ({ queryKey }: ModalProps) => {
    const { isActive, close } = useCreatePostModal();

    return (
        <ModalRoot label="Create post modal" isOpen={isActive} title="Create post" closeModal={close}>
            <Content queryKey={queryKey} />
        </ModalRoot>
    );
};
