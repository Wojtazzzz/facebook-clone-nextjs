import { faCommentSlash } from '@fortawesome/free-solid-svg-icons';
import { Option } from '../../Option';
import { useTurnOffComments } from './useTurnOffComments';
import type { QueryKey } from '@tanstack/react-query';

interface TurnOffCommentsProps {
    postId: number;
    queryKey: QueryKey;
}

export const TurnOffComments = ({ postId, queryKey }: TurnOffCommentsProps) => {
    const { turnOffComments, isLoading } = useTurnOffComments(queryKey);

    const handleTurnOffComments = () => turnOffComments(postId);

    return (
        <Option title="Turn off comments" icon={faCommentSlash} isActive={isLoading} callback={handleTurnOffComments} />
    );
};
