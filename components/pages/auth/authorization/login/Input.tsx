import { ErrorMessage, useFormikContext } from 'formik';
import { clsx } from 'clsx';
import type { ILoginPayload } from '@utils/types';

interface InputProps {
    label: string;
    type: 'email' | 'password';
    name: 'email' | 'password';
    placeholder?: string;
    isDisabled: boolean;
}

export const Input = ({ label, type, name, placeholder, isDisabled }: InputProps) => {
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
                disabled={isDisabled}
                className={clsx(
                    'tracking-wide bg-dark-200 focus:outline-none ring-2 ring-dark-100 focus:ring-primary placeholder-opacity-60 rounded-md py-2 px-4',
                    isDisabled
                        ? 'cursor-not-allowed text-dark-100 placeholder-light-100'
                        : 'text-white placeholder-light-50'
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
