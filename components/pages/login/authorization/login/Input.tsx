import { ErrorMessage, useFormikContext } from 'formik';
import { clsx } from 'clsx';
import type { ILoginPayload } from '@utils/types';

interface InputProps {
    label: string;
    type: 'email' | 'password';
    name: 'email' | 'password';
    placeholder?: string;
    isLoading: boolean;
}

export const Input = ({ label, type, name, placeholder, isLoading }: InputProps) => {
    const { values, handleChange, handleBlur } = useFormikContext<ILoginPayload>();

    return (
        <div className="flex flex-col gap-2">
            <input
                type={type}
                name={name}
                value={values[name]}
                placeholder={placeholder ?? label}
                aria-label={label}
                aria-describedby={`validationError-${name}`}
                required
                disabled={isLoading}
                className={clsx(
                    'tracking-wide bg-dark-200 focus:outline-none ring-2 ring-dark-100 text-light-50 placeholder-light-50 focus:ring-primary placeholder-opacity-60 rounded-md py-2 px-4',
                    isLoading && 'opacity-60 cursor-wait'
                )}
                onChange={handleChange}
                onBlur={handleBlur}
            />

            <div id={`validationError-${name}`}>
                <ErrorMessage name={name} component="small" className="text-xs text-red-400 font-medium" />
            </div>
        </div>
    );
};
