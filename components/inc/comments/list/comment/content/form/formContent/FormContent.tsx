import type { ICommentPayload } from '@utils/types';
import clsx from 'clsx';
import { useFormikContext } from 'formik';
import { Input } from './Input';
import { Panel } from './panel/Panel';
import { ValidationErrors } from './ValidationErrors';

interface FormContentProps {
    isLoading: boolean;
    isError: boolean;
}

export const FormContent = ({ isLoading, isError }: FormContentProps) => {
    const { errors } = useFormikContext<ICommentPayload>();

    return (
        <>
            <div
                className={clsx(
                    'w-full flex justify-between items-center bg-dark-100 text-light-200 rounded-3xl focus:outline-none py-2 px-4',
                    (isError || errors.content) && 'border-[1px] border-red-400'
                )}
            >
                <Input isLoading={isLoading} />
                <Panel isLoading={isLoading} />
            </div>

            <ValidationErrors />
        </>
    );
};
