import { faImages } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface ToggleImagesUploadProps {
    isUploadActive: boolean;
    toggle: () => void;
}

export const ToggleImagesUpload = ({ isUploadActive, toggle }: ToggleImagesUploadProps) => {
    return (
        <div className="flex justify-between items-center border-[1.5px] border-dark-100 rounded-lg p-3">
            <span className="text-light-200 font-medium">Add to your post</span>

            <div className="flex gap-2">
                <button
                    type="button"
                    aria-label="Show files uploader"
                    aria-pressed={isUploadActive}
                    className="focus:outline-none"
                    onClick={toggle}
                >
                    <FontAwesomeIcon icon={faImages} className="text-xl md:text-2xl text-green-400" />
                </button>
            </div>
        </div>
    );
};
