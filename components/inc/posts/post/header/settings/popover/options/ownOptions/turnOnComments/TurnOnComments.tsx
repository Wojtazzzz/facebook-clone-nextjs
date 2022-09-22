import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { Option } from '../../Option';
import { useTurnOnComments } from './useTurnOnComments';
import type { QueryKey } from '@tanstack/react-query';

interface TurnOnCommentsProps {
    postId: number;
    queryKey: QueryKey;
}

export const TurnOnComments = ({ postId, queryKey }: TurnOnCommentsProps) => {
    const { turnOnComments, isLoading } = useTurnOnComments(queryKey);

    const handleTurnOnComments = () => turnOnComments(postId);

    return (
        <Option title="Turn on comments" icon={faCircleCheck} isActive={isLoading} callback={handleTurnOnComments} />
    );
};
