import { RoundedButton } from '@components/inc/RoundedButton';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

interface CloseButtonProps {
    closeGallery: () => void;
}

export const CloseButton = ({ closeGallery }: CloseButtonProps) => {
    return (
        <div className="w-full flex justify-end absolute top-0 left-0 z-20 p-3">
            <RoundedButton
                label="Close gallery"
                icon={faTimes}
                styles="bg-dark-100 hover:bg-dark-100/90"
                callback={closeGallery}
            />
        </div>
    );
};
