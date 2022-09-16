import { useAlertModal } from '@hooks/useAlertModal';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { Button } from './Button';

export const AlertModal = () => {
    const { isOpen, message, closeAlert } = useAlertModal();

    return (
        <AlertDialog.Root open={isOpen}>
            <AlertDialog.Portal>
                <AlertDialog.Overlay
                    data-testid="alertModal-overlay"
                    className="fixed top-0 left-0 bg-dark-100 opacity-20 transition-all w-full h-full"
                    onClick={closeAlert}
                />

                <AlertDialog.Content
                    className="w-10/12 md:w-8/12 max-w-[500px] fixed top-1/2 left-1/2 bg-dark-200 shadow-lg rounded-lg -translate-x-1/2 -translate-y-1/2 p-6"
                    onEscapeKeyDown={closeAlert}
                >
                    <AlertDialog.Title className="text-xl text-light-200 font-semibold tracking-wide">
                        App Error
                    </AlertDialog.Title>

                    <AlertDialog.Description className="text-light-100 mt-2">{message}</AlertDialog.Description>

                    <AlertDialog.Cancel asChild>
                        <div className="w-full flex justify-end mt-5">
                            <Button title="OK" callback={closeAlert} />
                        </div>
                    </AlertDialog.Cancel>
                </AlertDialog.Content>
            </AlertDialog.Portal>
        </AlertDialog.Root>
    );
};
