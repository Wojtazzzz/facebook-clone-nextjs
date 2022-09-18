import { useAlertModal } from '@hooks/useAlertModal';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { Description } from './Description';
import { Overlay } from './Overlay';
import { Panel } from './Panel';
import { Title } from './Title';

export const AlertModal = () => {
    const { isOpen, message, closeAlert } = useAlertModal();

    return (
        <AlertDialog.Root open={isOpen}>
            <AlertDialog.Portal>
                <Overlay close={closeAlert} />

                <AlertDialog.Content
                    className="w-10/12 md:w-8/12 max-w-[500px] fixed top-1/2 left-1/2 bg-dark-200 shadow-lg rounded-lg -translate-x-1/2 -translate-y-1/2 p-6"
                    onEscapeKeyDown={closeAlert}
                >
                    <Title title="App Error" />

                    <Description description={message} />

                    <Panel close={closeAlert} />
                </AlertDialog.Content>
            </AlertDialog.Portal>
        </AlertDialog.Root>
    );
};
