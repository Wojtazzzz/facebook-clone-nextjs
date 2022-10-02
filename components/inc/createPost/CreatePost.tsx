import * as Dialog from '@radix-ui/react-dialog';
import type { QueryKey } from '@tanstack/react-query';
import { Modal } from './modal/Modal';
import { Trigger } from './trigger/Trigger';
import { useCreatePostModal } from './useCreatePostModal';

interface CreatePostProps {
    queryKey: QueryKey;
}

export const CreatePost = ({ queryKey }: CreatePostProps) => {
    const { isActive, open, close } = useCreatePostModal();

    return (
        <Dialog.Root open={isActive} modal={true}>
            <Trigger open={open} />
            <Modal queryKey={queryKey} close={close} />
        </Dialog.Root>
    );
};
