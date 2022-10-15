import * as AlertDialog from '@radix-ui/react-alert-dialog';

interface PanelProps {
    close: () => void;
    callback?: () => void;
}

export const Panel = ({ close, callback }: PanelProps) => {
    const handleConfirm = () => {
        if (callback) {
            callback();
        }

        close();
    };

    return (
        <div className="w-full flex justify-end gap-3 mt-5">
            <AlertDialog.Cancel
                className="bg-primary hover:bg-primary/90 text-sm text-white font-medium rounded-lg transition-colors p-2 px-3"
                onClick={close}
            >
                NO
            </AlertDialog.Cancel>

            <AlertDialog.Action
                className="bg-red-500 hover:bg-red-500/90 text-sm text-white font-medium rounded-lg transition-colors p-2 px-3"
                onClick={handleConfirm}
            >
                YES, SURE!
            </AlertDialog.Action>
        </div>
    );
};
