import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { closeModal, openModal } from '@redux/slices/CreatePostModalSlice';

export const useCreatePostModal = () => {
    const dispatch = useAppDispatch();
    const { isActive } = useAppSelector((store) => store.createPostModal);

    const open = () => {
        dispatch(openModal());
    };

    const close = () => {
        dispatch(closeModal());
    };

    return {
        isActive,
        open,
        close,
    };
};
