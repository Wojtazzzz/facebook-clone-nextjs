import ReactModal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Form } from '@components/pages/posts/create/modal/Form';
import { RoundedButton } from '@components/inc/RoundedButton';

import { modalStyles } from '@components/pages/posts/create/modal/styles';

ReactModal.setAppElement('body');

interface ModalProps {
    handleCloseModal: () => void;
}

export const Modal = ({ handleCloseModal }: ModalProps) => {
    return (
        <ReactModal
            contentLabel="Create post modal"
            isOpen={true}
            style={modalStyles}
            onRequestClose={handleCloseModal}
        >
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
