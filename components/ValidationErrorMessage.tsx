import { ErrorMessage } from 'formik';

interface ValidationErrorMessageProps {
    size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl' | '9xl';
    fieldName: string;
}

export const ValidationErrorMessage = ({ size = 'sm', fieldName }: ValidationErrorMessageProps) => {
    return (
        <span className={`text-${size} text-red-400 font-medium`}>
            <ErrorMessage name={fieldName} />
        </span>
    );
};
