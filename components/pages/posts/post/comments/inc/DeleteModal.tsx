import { useEffect } from 'react';
import { usePaginatedData } from '@hooks/usePaginatedData';
import { useComments } from '@hooks/useComments';

import ReactModal from 'react-modal';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { RoundedButton } from '@components/inc/RoundedButton';
import { SpinnerLoader } from '@components/inc/SpinnerLoader';
import { ApiError } from '@components/inc/ApiError';

import { modalStyles } from '@components/pages/posts/create/modal/styles';

import type { CommentType } from '@ctypes/features/CommentType';

ReactModal.setAppElement('body');

interface DeleteModalProps {
    postId: number;
    commentId: number;
    closeModal: () => void;
}

export const DeleteModal = ({ postId, commentId, closeModal }: DeleteModalProps) => {
    const { reloadData: reloadComments } = usePaginatedData<CommentType>(`/api/posts/${postId}/comments`);
    const { state, removeComment } = useComments();

    useEffect(() => {
        if (state.status === 'LOADING') return;

        if (state.status === 'SUCCESS') {
            reloadComments();
            closeModal();
        }
    }, [state, reloadComments, closeModal]);

    return (
        <ReactModal contentLabel="Delete comment modal" isOpen={true} style={modalStyles} onRequestClose={closeModal}>
            <div className="px-1">
                <div className="h-full flex flex-col bg-dark-200 rounded-lg mx-auto">
                    <div className="w-full flex justify-between text-light-200 border-zinc-600 border-b-[1.5px] py-5 px-3">
                        <FontAwesomeIcon className="w-8 text-lg invisible pointer-events-none" icon={faTimes} />

                        <h3 className="text-2xl text-center font-bold">Are you sure you want to delete the comment?</h3>

                        <RoundedButton
                            name="Close modal"
                            icon={faTimes}
                            size={8}
                            bgColor="dark-200"
                            onHover="bg-dark-100"
                            callback={closeModal}
                        />
                    </div>

                    <div className="w-full flex justify-center">
                        {state.status === 'LOADING' ? (
                            <SpinnerLoader testid="deleteModal-loading" containerStyles="w-[120px] my-8" />
                        ) : (
                            <div className="flex flex-col py-8">
                                {state.status === 'ERROR' ? (
                                    <div className="-mt-12">
                                        <ApiError isSmall />
                                    </div>
                                ) : (
                                    <div className="flex justify-center gap-12">
                                        <button
                                            aria-label="Don't delete comment"
                                            className="text-3xl text-light-100 font-bold"
                                            onClick={closeModal}
                                        >
                                            NO
                                        </button>

                                        <button
                                            aria-label="Delete comment"
                                            className="text-3xl text-light-100 font-bold"
                                            onClick={() => removeComment(postId, commentId)}
                                        >
                                            YES
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </ReactModal>
    );
};
