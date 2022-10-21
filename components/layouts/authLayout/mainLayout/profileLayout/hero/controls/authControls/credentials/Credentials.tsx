import * as Dialog from '@radix-ui/react-dialog';
import { Button } from '@components/inc/Button';
import { Modal } from './modal/Modal';
import { useCredentialsModal } from './useCredentialsModal';

export const Credentials = () => {
    const { isActive, open, close } = useCredentialsModal();

    return (
        <Dialog.Root open={isActive} modal={true}>
            <Button title="Credentials" styles="w-[130px] xl:w-[155px]" callback={open} />
            <Modal close={close} />
        </Dialog.Root>
    );
};
