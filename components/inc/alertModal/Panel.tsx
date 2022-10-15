import * as AlertDialog from '@radix-ui/react-alert-dialog';

interface PanelProps {
    close: () => void;
}

export const Panel = ({ close }: PanelProps) => {
    return (
        <div className="w-full flex justify-end mt-5">
            <AlertDialog.Cancel
                aria-label="OK"
                className="bg-primary hover:bg-primary/90 text-white font-medium rounded-lg transition-colors p-2 px-4"
                onClick={close}
            >
                OK
            </AlertDialog.Cancel>
        </div>
    );
};
