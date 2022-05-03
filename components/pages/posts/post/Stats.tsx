import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

interface StatsProps {
    likesCount: number;
    commentsCount: number;
}

export const Stats = ({ likesCount, commentsCount }: StatsProps) => {
    return (
        <div className="w-full flex justify-between text-light-100 p-3 pt-0">
            <div className="flex items-center gap-2">
                <div className="w-5 h-5 flex justify-center items-center bg-primary rounded-full">
                    <FontAwesomeIcon icon={faThumbsUp} className="text-xs text-white" />
                </div>

                <span>{likesCount}</span>
            </div>

            <span className="text-sm cursor-pointer hover:underline">{commentsCount} comments</span>
        </div>
    );
};
