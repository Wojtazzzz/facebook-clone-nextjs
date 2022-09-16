import { faShare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface ShareProps {}

export const Share = ({}: ShareProps) => {
    const handleShare = () => alert('Action to implement...');

    return (
        <div className="border-t-2 border-t-dark-100 mt-5 px-3">
            <button
                aria-label="Share born"
                className="w-full flex justify-center items-center gap-1.5 text-light-100 font-medium hover:bg-dark-100 rounded-lg mt-2 py-2"
                onClick={handleShare}
            >
                <FontAwesomeIcon icon={faShare} />

                <span>Share</span>
            </button>
        </div>
    );
};
