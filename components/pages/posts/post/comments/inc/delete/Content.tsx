import { useEffect } from 'react';
import { usePaginatedData } from '@hooks/usePaginatedData';
import { useComments } from '@hooks/useComments';

import { SpinnerLoader } from '@components/inc/SpinnerLoader';
import { ApiError } from '@components/inc/ApiError';

import type { CommentType } from '@ctypes/features/CommentType';

interface ContentProps {
    postId: number;
    commentId: number;
    closeModal: () => void;
}

export const Content = ({ postId, commentId, closeModal }: ContentProps) => {
    const { reloadData: reloadComments } = usePaginatedData<CommentType>(`/api/posts/${postId}/comments`);
    const { state, removeComment } = useComments();

    useEffect(() => {
        if (state.status === 'LOADING') return;

        if (state.status === 'SUCCESS') {
            reloadComments();
            closeModal();
        }
    }, [state, reloadComments, closeModal]);

    if (state.status === 'LOADING')
        return <SpinnerLoader testid="deleteModal-loading" containerStyles="w-[80px] my-10 mx-auto" />;
    if (state.status === 'ERROR') return <ApiError size="lg" />;

    return (
        <div className="w-full flex justify-center">
            <div className="flex flex-col py-8">
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
            </div>
        </div>
    );
};
