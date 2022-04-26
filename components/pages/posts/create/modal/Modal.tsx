import { useEffect } from 'react';

import ReactModal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Form } from '@components/pages/posts/create/modal/Form';
import { RoundedButton } from '@components/inc/RoundedButton';

import { modalStyles } from '@components/pages/posts/create/modal/styles';

import type { MouseEvent } from 'react';

interface ModalProps {
    handleCloseModal: (event: MouseEvent) => void;
}

export const Modal = ({ handleCloseModal }: ModalProps) => {
    useEffect(() => {
        ReactModal.setAppElement('body');
    }, []);

    return (
        <ReactModal contentLabel="Create Post" isOpen={true} style={modalStyles} onRequestClose={handleCloseModal}>
            <div className="px-1">
                <div className="h-full flex flex-col bg-dark-200 rounded-lg mx-auto">
                    <div className="w-full flex justify-between text-light-200 border-zinc-600 border-b-[1.5px] p-3">
                        <FontAwesomeIcon className="w-8 text-lg invisible pointer-events-none" icon={faTimes} />

                        <h3 className="text-2xl text-center font-bold">Create Post</h3>

                        <RoundedButton
                            name="Close modal"
                            icon={faTimes}
                            size={8}
                            bgColor="dark-200"
                            onHover="bg-dark-100"
                            callback={handleCloseModal}
                        />
                    </div>

                    <Form />
                </div>
            </div>
        </ReactModal>
    );
};
