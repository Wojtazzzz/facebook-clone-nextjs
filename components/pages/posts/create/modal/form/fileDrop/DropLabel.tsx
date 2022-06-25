import { faImages } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface DropLabelProps {
    changeUploadActive: () => void;
}

export const DropLabel = ({ changeUploadActive }: DropLabelProps) => {
    return (
        <div className="flex justify-between items-center border-[1.5px] border-dark-100 rounded-lg p-3">
            <span className="text-light-200 font-medium">Add to your post</span>

            <div className="flex gap-2">
                <button
                    type="button"
                    aria-label="Show input file"
                    className="focus:outline-none"
                    onClick={changeUploadActive}
                >
                    <FontAwesomeIcon icon={faImages} className="text-2xl text-green-400" />
                </button>
            </div>
        </div>
    );
};
