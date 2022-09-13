import { faCommentSlash } from '@fortawesome/free-solid-svg-icons';
import { Option } from '../../Option';
import { useTurnOffComments } from './useTurnOffComments';

interface TurnOffCommentsProps {
    postId: number;
    queryKey: unknown[];
}

export const TurnOffComments = ({ postId, queryKey }: TurnOffCommentsProps) => {
    const { turnOffComments, isLoading } = useTurnOffComments(queryKey);

    const handleTurnOffComments = () => turnOffComments(postId);

    return (
        <Option title="Turn off comments" icon={faCommentSlash} isActive={isLoading} callback={handleTurnOffComments} />
    );
};