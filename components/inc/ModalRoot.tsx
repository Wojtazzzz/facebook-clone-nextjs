import { useKey } from '@hooks/useKey';
import ReactModal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { RoundedButton } from '@components/inc/RoundedButton';
import type { ReactNode } from 'react';

ReactModal.setAppElement('body');

interface ModalRootProps {
    isOpen: boolean;
    title: string;
    closeModal: () => void;
    children: ReactNode;
}

export const ModalRoot = ({ isOpen, title, closeModal, children }: ModalRootProps) => {
    useKey('Escape', closeModal);

    return (
        <ReactModal
            isOpen={isOpen}
            className="w-full max-w-[520px] min-w-[300px] h-fit max-h-[75vh] top-1/2 left-1/2 right-auto bottom-auto -translate-y-1/2 -translate-x-1/2 flex flex-col bg-dark-200 rounded-lg relative z-[42] p-0"
            overlayClassName="fixed top-0 left-0 w-full h-screen bg-dark-100 bg-opacity-60 z-[41]"
            onRequestClose={closeModal}
            contentLabel={title}
        >
            <div className="w-full flex justify-between items-center text-light-200 border-zinc-600 border-b-[1.5px] p-3">
                <FontAwesomeIcon className="w-8 text-lg invisible pointer-events-none" icon={faTimes} />

                <h3 className="text-2xl text-center font-bold">{title}</h3>

                <RoundedButton label="Close modal" icon={faTimes} callback={closeModal} />
            </div>

            <div className="overflow-y-scroll scrollbar-thin scrollbar-thumb-dark-100 scrollbar-track-dark-200">
                {children}
            </div>
        </ReactModal>
    );
};
