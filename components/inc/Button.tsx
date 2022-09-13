import { clsx } from 'clsx';

interface ButtonProps {
    title: string;
    type?: 'submit' | 'button';
    styles?: string;
    isDisabled?: boolean;
    callback?: (arg?: any) => void;
}

export const Button = ({
    title,
    type = 'button',
    styles = '',
    isDisabled = false,
    callback = undefined,
}: ButtonProps) => {
    return (
        <button
            title={title}
            aria-label={title}
            type={type}
            disabled={isDisabled}
            className={clsx(
                `bg-primary hover:opacity-90 text-white font-medium rounded-lg transition-opacity p-2 px-4 ${styles}`,
                isDisabled && 'opacity-60 hover:opacity-60 cursor-not-allowed'
            )}
            onClick={callback}
        >
            {title}
        </button>
    );
};
