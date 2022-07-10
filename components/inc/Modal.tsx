import ReactModal from 'react-modal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { RoundedButton } from '@components/inc/RoundedButton';

import type { ReactNode } from 'react';

import { modalStyles } from '@styles/modalStyles';

interface ModalProps {
    title: string;
    closeModal: () => void;
    children: ReactNode;
}

ReactModal.setAppElement('body');

export const Modal = ({ title, closeModal, children }: ModalProps) => {
    return (
        <ReactModal contentLabel={title} isOpen={true} style={modalStyles} onRequestClose={closeModal}>
            <div className="px-1">
                <div className="h-full flex flex-col bg-dark-200 rounded-lg mx-auto">
                    <div className="w-full flex justify-between text-light-200 border-zinc-600 border-b-[1.5px] p-3">
                        <FontAwesomeIcon className="w-8 text-lg invisible pointer-events-none" icon={faTimes} />

                        <h3 className="text-2xl text-center font-bold">{title}</h3>

                        <RoundedButton
                            name="Close modal"
                            icon={faTimes}
                            size={8}
                            bgColor="dark-200"
                            onHover="bg-dark-100"
                            callback={closeModal}
                        />
                    </div>

                    {children}
                </div>
            </div>
        </ReactModal>
    );
};
