import { useKey } from '@hooks/useKey';
import ReactModal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { RoundedButton } from '@components/inc/RoundedButton';
import type { ReactNode } from 'react';
import { modalStyles } from '@styles/modalStyles';

ReactModal.setAppElement('body');

interface ModalRootProps {
    label: string;
    isOpen: boolean;
    title: string;
    closeModal: () => void;
    children: ReactNode;
}

export const ModalRoot = ({ label, isOpen, title, closeModal, children }: ModalRootProps) => {
    useKey('Escape', closeModal);

    return (
        <ReactModal isOpen={isOpen} style={modalStyles} onRequestClose={closeModal}>
            <div
                aria-label={label}
                className="h-full flex flex-col bg-dark-200 rounded-lg mx-auto px-1"
                style={{ maxHeight: '75vh' }}
            >
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

                <div className="overflow-y-scroll scrollbar-thin scrollbar-thumb-dark-100 scrollbar-track-dark-200">
                    {children}
                </div>
            </div>
        </ReactModal>
    );
};
