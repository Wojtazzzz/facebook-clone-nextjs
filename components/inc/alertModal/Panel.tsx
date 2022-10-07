import * as AlertDialog from '@radix-ui/react-alert-dialog';

interface PanelProps {
    close: () => void;
}

export const Panel = ({ close }: PanelProps) => {
    return (
        <div className="w-full flex justify-end mt-5">
            <AlertDialog.Cancel
                aria-label="OK"
                className="bg-primary hover:opacity-90 text-white font-medium rounded-lg transition-opacity p-2 px-4"
                onClick={close}
            >
                OK
            </AlertDialog.Cancel>
        </div>
    );
};
