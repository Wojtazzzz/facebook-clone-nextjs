import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { Button } from '../Button';

interface PanelProps {
    close: () => void;
}

export const Panel = ({ close }: PanelProps) => {
    return (
        <AlertDialog.Cancel asChild>
            <div className="w-full flex justify-end mt-5">
                <Button title="OK" callback={close} />
            </div>
        </AlertDialog.Cancel>
    );
};
