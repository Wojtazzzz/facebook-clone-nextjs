import { confirm, closeConfirm } from '@redux/slices/ConfirmModalSlice';
import { useAppDispatch, useAppSelector } from './redux';

export const useConfirmModal = () => {
    const dispatch = useAppDispatch();
    const { message, callback } = useAppSelector((store) => store.confirmModal);

    const handleConfirm = (message: string, callback: () => void) => {
        dispatch(confirm({ message, callback }));
    };

    const handleCloseConfirm = () => {
        dispatch(closeConfirm());
    };

    return {
        isOpen: Boolean(message),
        message,
        callback,
        confirm: handleConfirm,
        closeConfirm: handleCloseConfirm,
    };
};
