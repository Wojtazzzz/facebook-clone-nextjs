import { ErrorMessage } from 'formik';

import { clsx } from 'clsx';

import type { ChangeEvent, FocusEvent, HTMLInputTypeAttribute } from 'react';

interface InputProps {
    type: HTMLInputTypeAttribute;
    name: string;
    value?: string;
    placeholder: string;
    isDisabled?: boolean;
    onChange?: (event: ChangeEvent) => void;
    onBlur?: (event: FocusEvent) => void;
}

export const Input = ({ type, name, value = '', placeholder, isDisabled = false, onChange, onBlur }: InputProps) => {
    return (
        <div className="flex flex-col gap-2">
            <input
                type={type}
                name={name}
                value={value}
                placeholder={placeholder}
                aria-label={placeholder}
                required
                disabled={isDisabled}
                className={clsx(
                    'tracking-wide bg-dark-200 focus:outline-none ring-2 ring-dark-100 focus:ring-primary rounded-md py-2 px-4',
                    isDisabled && 'cursor-not-allowed text-dark-100 placeholder-light-100',
                    !isDisabled && 'text-light-50 placeholder-light-50'
                )}
                onChange={onChange ? (event) => onChange(event) : undefined}
                onBlur={onBlur ? (event) => onBlur(event) : undefined}
            />

            {isDisabled || <ErrorMessage name={name} component="small" className="text-xs text-red-400 font-medium" />}
        </div>
    );
};
