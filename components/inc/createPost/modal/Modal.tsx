import * as Dialog from '@radix-ui/react-dialog';
import type { QueryKey } from '@tanstack/react-query';
import { Form } from './form/Form';
import { Header } from './Header';

interface ModalProps {
    queryKey: QueryKey;
    close: () => void;
}

export const Modal = ({ queryKey, close }: ModalProps) => {
    return (
        <Dialog.Portal>
            <Dialog.Overlay className="w-screen h-screen fixed top-0 left-0 z-[49] bg-dark-300 bg-opacity-40" />

            <Dialog.Content
                onEscapeKeyDown={close}
                onPointerDownOutside={close}
                data-testid="createPostModal"
                aria-modal="true"
                aria-labelledby="createPostModal-heading"
                className="w-full max-w-[520px] min-w-[300px] h-fit max-h-[75vh] fixed top-1/2 left-1/2 right-auto bottom-auto -translate-y-1/2 -translate-x-1/2 flex flex-col text-light-50 bg-dark-200 rounded-lg z-50"
            >
                <Header close={close} />

                <div className="overflow-y-scroll scrollbar-thin scrollbar-thumb-dark-100 scrollbar-track-dark-200">
                    <Form queryKey={queryKey} close={close} />
                </div>

                <Dialog.Close />
            </Dialog.Content>
        </Dialog.Portal>
    );
};
