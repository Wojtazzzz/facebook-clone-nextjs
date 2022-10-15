import { RoundedButton } from '@components/inc/RoundedButton';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

interface CloseProps {
    close: () => void;
}

export const Close = ({ close }: CloseProps) => {
    return (
        <div className="w-full flex justify-end absolute top-0 left-0 z-20 p-3">
            <RoundedButton
                label="Close zoom"
                icon={faTimes}
                styles="bg-dark-100 hover:bg-dark-100/60"
                callback={close}
            />
        </div>
    );
};
