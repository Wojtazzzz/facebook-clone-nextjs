import { ErrorMessage } from 'formik';

interface ValidationErrorProps {
    size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl' | '9xl';
    fieldName: string;
}

export const ValidationError = ({ size = 'sm', fieldName }: ValidationErrorProps) => {
    return (
        <span className={`text-${size} text-red-400 font-medium`}>
            <ErrorMessage name={fieldName} />
        </span>
    );
};
