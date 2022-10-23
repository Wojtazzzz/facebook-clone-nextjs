import { Portal, Overlay, Content } from '@radix-ui/react-dialog';
import type { ReactNode } from 'react';
import { Header } from './Header';
import { v4 as uuid } from 'uuid';

interface ModalProps {
    title: string;
    close: () => void;
    children: ReactNode;
}

export const Modal = ({ title, close, children }: ModalProps) => {
    const id = uuid();

    return (
        <Portal>
            <Overlay className="w-screen h-screen fixed top-0 left-0 z-[49] bg-dark-300/70" onClick={close} />

            <Content
                aria-modal="true"
                aria-labelledby={`${id}-header`}
                className="w-full max-w-[520px] min-w-[300px] h-fit max-h-[75vh] fixed top-1/2 left-1/2 right-auto bottom-auto -translate-y-1/2 -translate-x-1/2 box-content flex flex-col text-light-50 z-50 p-1.5"
                onEscapeKeyDown={close}
                onPointerDownOutside={close}
            >
                <main className="bg-dark-200 rounded-lg m-2">
                    <Header id={id} title={title} close={close} />

                    <div className="m-1 md:m-3">{children}</div>
                </main>
            </Content>
        </Portal>
    );
};
