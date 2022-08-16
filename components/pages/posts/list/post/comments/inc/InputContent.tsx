import type { ICommentPayload } from '@utils/types';
import clsx from 'clsx';
import { useFormikContext } from 'formik';

interface InputContentProps {
    isLoading: boolean;
}

export const InputContent = ({ isLoading }: InputContentProps) => {
    const { values, handleChange, handleBlur } = useFormikContext<ICommentPayload>();

    return (
        <input
            autoFocus
            type="text"
            aria-label="Write a comment"
            name="content"
            disabled={isLoading}
            value={values.content}
            placeholder="Write a comment..."
            className={clsx('w-full bg-transparent focus:outline-none', isLoading && 'cursor-progress')}
            autoComplete="off"
            onChange={handleChange}
            onBlur={handleBlur}
        />
    );
};
