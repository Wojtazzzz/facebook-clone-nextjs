import { useConfirmModal } from '@hooks/useConfirmModal';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { Description } from './Description';
import { Overlay } from './Overlay';
import { Panel } from './Panel';
import { Title } from './Title';

export const ConfirmModal = () => {
    const { isOpen, message, callback, closeConfirm } = useConfirmModal();

    return (
        <AlertDialog.Root open={isOpen}>
            <AlertDialog.Portal>
                <Overlay close={closeConfirm} />

                <AlertDialog.Content
                    aria-labelledby="confirmDialog-title"
                    aria-describedby="confirmDialog-description"
                    className="w-10/12 md:w-8/12 max-w-[500px] fixed top-1/2 left-1/2 z-50 bg-dark-200 shadow-lg rounded-lg -translate-x-1/2 -translate-y-1/2 p-6"
                    onEscapeKeyDown={closeConfirm}
                >
                    <Title title="Please confirm" />

                    <Description description={message} />

                    <Panel close={closeConfirm} callback={callback} />
                </AlertDialog.Content>
            </AlertDialog.Portal>
        </AlertDialog.Root>
    );
};
