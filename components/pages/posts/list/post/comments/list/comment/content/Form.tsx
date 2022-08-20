import { ICommentPayload } from '@utils/types';
import { Form as UpdateForm } from '../../../inc/Form';
import { useUpdate } from './useUpdate';

interface FormProps {
    content: string;
    postId: number;
    commentId: number;
    closeEditMode: () => void;
}

export const Form = ({ content, postId, commentId, closeEditMode }: FormProps) => {
    const { update, isLoading, isError, error } = useUpdate();

    const handleSubmit = ({ content }: ICommentPayload) => {
        update({ content, resourceId: postId, commentId }, closeEditMode);
    };

    return (
        <UpdateForm
            content={content}
            isLoading={isLoading}
            isError={isError}
            error={error}
            handleSubmit={handleSubmit}
        />
    );
};
