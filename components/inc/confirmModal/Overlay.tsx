import * as AlertDialog from '@radix-ui/react-alert-dialog';

interface OverlayProps {
    close: () => void;
}

export const Overlay = ({ close }: OverlayProps) => {
    return (
        <AlertDialog.Overlay
            data-testid="confirmModal-overlay"
            className="fixed top-0 left-0 z-[49] bg-dark-100/20 transition-colors w-full h-full"
            onClick={close}
        />
    );
};
