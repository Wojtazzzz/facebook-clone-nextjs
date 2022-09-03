import { faCircleCheck, faCommentSlash, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Option } from '../Option';
import { useRemovePost } from './useRemovePost';
import { useTurnOffComments } from './useTurnOffComments';
import { useTurnOnComments } from './useTurnOnComments';

interface OwnOptionsProps {
    postId: number;
    commenting: boolean;
    queryKey: unknown[];
}

export const OwnOptions = ({ postId, commenting, queryKey }: OwnOptionsProps) => {
    const { remove, isLoading: isRemoveLoading } = useRemovePost(queryKey);
    const { turnOffComments, isLoading: isTurnOffCommentsLoading } = useTurnOffComments(queryKey);
    const { turnOnComments, isLoading: isTurnOnCommentsLoading } = useTurnOnComments(queryKey);

    const handleRemovePost = () => remove(postId);
    const handleTurnOffComments = () => turnOffComments(postId);
    const handleTurnOnComments = () => turnOnComments(postId);

    return (
        <>
            {commenting ? (
                <Option
                    title="Turn off comments"
                    icon={faCommentSlash}
                    isActive={isTurnOffCommentsLoading}
                    callback={handleTurnOffComments}
                />
            ) : (
                <Option
                    title="Turn on comments"
                    icon={faCircleCheck}
                    isActive={isTurnOnCommentsLoading}
                    callback={handleTurnOnComments}
                />
            )}

            <Option title="Delete" icon={faTrashCan} isActive={isRemoveLoading} callback={handleRemovePost} />
        </>
    );
};
