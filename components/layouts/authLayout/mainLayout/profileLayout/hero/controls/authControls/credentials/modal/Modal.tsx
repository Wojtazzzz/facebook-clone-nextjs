import * as Dialog from '@radix-ui/react-dialog';
import { AuthData } from './authData/AuthData';
import { Header } from './Header';

interface ModalProps {
    close: () => void;
}

export const Modal = ({ close }: ModalProps) => {
    return (
        <Dialog.Portal>
            <Dialog.Overlay className="w-screen h-screen fixed top-0 left-0 z-[49] bg-dark-300/70" onClick={close} />

            <Dialog.Content
                data-testid="credentialsModal"
                aria-modal="true"
                aria-labelledby="credentialsModal-header"
                className="w-full max-w-[520px] min-w-[300px] h-fit max-h-[75vh] fixed top-1/2 left-1/2 right-auto bottom-auto -translate-y-1/2 -translate-x-1/2 box-content flex flex-col text-light-50 z-50 p-1.5"
                onEscapeKeyDown={close}
                onPointerDownOutside={close}
            >
                <div className="bg-dark-200 rounded-lg m-2">
                    <Header close={close} />

                    <main className="p-4">
                        <AuthData />
                    </main>
                </div>
            </Dialog.Content>
        </Dialog.Portal>
    );
};
