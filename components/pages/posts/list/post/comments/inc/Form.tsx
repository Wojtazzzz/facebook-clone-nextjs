import { Formik, Form as FormikForm } from 'formik';
import type { FormikHelpers } from 'formik';
import { clsx } from 'clsx';
import { CommentSchema } from '@validation/CommentSchema';
import { ValidationErrors } from './ValidationErrors';
import { InputContent } from './InputContent';
import { SubmitButton } from './SubmitButton';
import type { ICommentPayload } from '@utils/types';

interface FormProps {
    content?: string;
    isLoading: boolean;
    isError: boolean;
    handleSubmit: ({ content }: ICommentPayload, { resetForm }: FormikHelpers<ICommentPayload>) => void;
}

export const Form = ({ content = '', isLoading, isError, handleSubmit }: FormProps) => {
    return (
        <Formik
            initialValues={{ content }}
            validationSchema={CommentSchema}
            validateOnBlur={false}
            validateOnChange={false}
            onSubmit={handleSubmit}
        >
            {({ errors }) => (
                <FormikForm className="w-full">
                    <div
                        className={clsx(
                            'w-full flex justify-between items-center bg-dark-100 text-light-200 rounded-3xl focus:outline-none py-2 px-4',
                            (isError || errors.content) && 'border-[1px] border-red-400'
                        )}
                    >
                        <InputContent isLoading={isLoading} />
                        <SubmitButton isLoading={isLoading} />
                    </div>

                    <ValidationErrors />
                </FormikForm>
            )}
        </Formik>
    );
};
