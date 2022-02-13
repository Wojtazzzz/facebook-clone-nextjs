import * as React from 'react';
import { ChangeEvent, FocusEvent } from 'react';

import { ErrorMessage } from 'formik';


interface InputProps {
    type: 'text' | 'password' | 'email'
    name: string,
    value: string,
    placeholder: string,
    onChange: (event: ChangeEvent) => void,
    onBlur: (event: FocusEvent) => void
}

export const Input: React.FC<InputProps> = ({ type, name, value, placeholder, onChange }) => {
    return (
        <div className="flex flex-col gap-2">
            <input
                type={type}
                name={name}
                value={value}
                placeholder={placeholder}
                required
                className="text-light-50 placeholder-light-50 tracking-wide bg-transparent focus:outline-none ring-2 ring-dark-100 focus:ring-primary rounded-md py-2 px-4"
                onChange={event => onChange(event)}
                onBlur={event => onChange(event)}
            />

            <ErrorMessage
                name={name}
                component="small"
                className="text-xs text-red-400 font-medium"
            />
        </div>
    );
}