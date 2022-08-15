import type { ICommentPayload } from '@utils/types';
import clsx from 'clsx';
import { useFormikContext } from 'formik';
import type { RefObject } from 'react';

interface InputContentProps {
    elRef: RefObject<HTMLInputElement>;
    isLoading: boolean;
}

export const InputContent = ({ elRef, isLoading }: InputContentProps) => {
    const { values, handleChange, handleBlur } = useFormikContext<ICommentPayload>();

    return (
        <input
            ref={elRef}
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
