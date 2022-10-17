import * as Dialog from '@radix-ui/react-dialog';
import { Form } from './form/Form';
import type { QueryKey } from '@tanstack/react-query';
import { Header } from './Header';

interface UpdateModalProps {
    queryKey: QueryKey;
    isActive: boolean;
    postId: number;
    content: string;
    images: string[];
    close: () => void;
}

export const UpdateModal = ({ isActive, close, ...rest }: UpdateModalProps) => {
    return (
        <Dialog.Portal>
            <Dialog.Overlay className="w-screen h-screen fixed top-0 left-0 z-[49] bg-dark-300/70" onClick={close} />

            <Dialog.Content
                data-testid="updatePostModal"
                aria-modal="true"
                aria-labelledby="updatePostModal-header"
                className="w-full max-w-[520px] min-w-[300px] h-fit max-h-[75vh] fixed top-1/2 left-1/2 right-auto bottom-auto -translate-y-1/2 -translate-x-1/2 box-content flex flex-col text-light-50 z-50 p-1.5"
                onEscapeKeyDown={close}
                onPointerDownOutside={close}
            >
                <div className="bg-dark-200 rounded-lg m-2">
                    <Header close={close} />

                    <main>
                        <Form {...rest} closeModal={close} />
                    </main>
                </div>
            </Dialog.Content>
        </Dialog.Portal>
    );
};
