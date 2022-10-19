import { faCircleCheck, faCommentSlash } from '@fortawesome/free-solid-svg-icons';
import { Option } from '../../Option';
import { useToggleCommenting } from './useToggleCommenting';
import type { QueryKey } from '@tanstack/react-query';

interface ToggleCommentingProps {
    postId: number;
    commenting: boolean;
    queryKey: QueryKey;
}

export const ToggleCommenting = ({ postId, commenting, queryKey }: ToggleCommentingProps) => {
    const { toggleCommenting, isLoading } = useToggleCommenting(queryKey);

    const handleToggleCommenting = () => toggleCommenting(postId);

    return (
        <Option
            title={commenting ? 'Turn off comments' : 'Turn on comments'}
            icon={commenting ? faCommentSlash : faCircleCheck}
            isLoading={isLoading}
            callback={handleToggleCommenting}
        />
    );
};
