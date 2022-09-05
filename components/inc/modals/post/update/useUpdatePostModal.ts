import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { closeModal, openModal } from '@redux/slices/UpdatePostModalSlice';
import type { IPost } from '@utils/types';

export const useUpdatePostModal = () => {
    const dispatch = useAppDispatch();
    const { isActive, post } = useAppSelector((store) => store.updatePostModal);

    const open = (post: IPost) => {
        dispatch(openModal(post));
    };

    const close = () => {
        dispatch(closeModal());
    };

    return {
        isActive,
        post,
        open,
        close,
    };
};
