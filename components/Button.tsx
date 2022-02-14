import * as React from 'react';


interface ButtonProps {
    title: string,
    color?: 'primary',
    type?: 'submit' | 'button',
    styles?: string,
    isDisabled?: boolean,
    callback?: (arg?: any) => void
}

export const Button: React.FC<ButtonProps> = ({
    title,
    color = 'primary',
    type = 'button',
    styles = '',
    isDisabled = false,
    callback
}) => {
    return (
        <button
            type={type}
            className={
                `w-full bg-${color} hover:opacity-90 text-sm md:text-base text-light-50 font-medium rounded-md transition-opacity mt-5 p-2 
                ${isDisabled ? 'opacity-60 hover:opacity-60 cursor-not-allowed' : ''} 
                ${styles}
            `}
            disabled={isDisabled}
            onClick={callback ?? undefined}
        >{title}</button>
    );
}