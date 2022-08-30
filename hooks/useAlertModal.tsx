import { alert, closeAlert } from '@redux/slices/AlertModalSlice';
import { useAppDispatch, useAppSelector } from './redux';

export const useAlertModal = () => {
    const dispatch = useAppDispatch();
    const { message } = useAppSelector((store) => store.alertModal);

    const handleAlert = (message: string) => {
        dispatch(alert({ message }));
    };

    const handleCloseAlert = () => {
        dispatch(closeAlert());
    };

    return {
        isOpen: !!message,
        message,
        alert: handleAlert,
        closeAlert: handleCloseAlert,
    };
};
