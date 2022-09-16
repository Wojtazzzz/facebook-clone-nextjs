import { faImages } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface ToggleFilesUploadProps {
    toggle: () => void;
}

export const ToggleFilesUpload = ({ toggle }: ToggleFilesUploadProps) => {
    return (
        <div className="flex justify-between items-center border-[1.5px] border-dark-100 rounded-lg p-3">
            <span className="text-light-200 font-medium">Add to your post</span>

            <div className="flex gap-2">
                <button type="button" aria-label="Show files uploader" className="focus:outline-none" onClick={toggle}>
                    <FontAwesomeIcon icon={faImages} className="text-xl md:text-2xl text-green-400" />
                </button>
            </div>
        </div>
    );
};
