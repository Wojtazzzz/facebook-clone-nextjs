import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

interface StatsProps {
    likesCount: number;
    commentsCount: number;
    handleToggleIsCommentsActive: () => void;
}

export const Stats = ({ likesCount, commentsCount, handleToggleIsCommentsActive }: StatsProps) => {
    return (
        <div className="w-full flex justify-between text-light-100 border-b-2 border-b-dark-100 p-3">
            <div className="flex items-center gap-2">
                {likesCount !== 0 && (
                    <>
                        <div className="w-5 h-5 flex justify-center items-center bg-primary rounded-full">
                            <FontAwesomeIcon icon={faThumbsUp} className="text-xs text-white" />
                        </div>

                        <span>{likesCount}</span>
                    </>
                )}
            </div>

            {commentsCount !== 0 && (
                <button className="text-sm cursor-pointer hover:underline" onClick={handleToggleIsCommentsActive}>
                    {commentsCount} comments
                </button>
            )}
        </div>
    );
};
