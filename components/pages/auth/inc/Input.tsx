import { ErrorMessage } from 'formik';

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
                className={`tracking-wide bg-dark-200 focus:outline-none ring-2 ring-dark-100 focus:ring-primary rounded-md ${
                    isDisabled
                        ? 'cursor-not-allowed text-dark-100 placeholder-light-100'
                        : 'text-light-50 placeholder-light-50'
                } py-2 px-4`}
                onChange={onChange ? (event) => onChange(event) : undefined}
                onBlur={onBlur ? (event) => onBlur(event) : undefined}
            />

            {isDisabled || <ErrorMessage name={name} component="small" className="text-xs text-red-400 font-medium" />}
        </div>
    );
};
