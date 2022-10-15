import { clsx } from 'clsx';

interface ButtonProps {
    title: string;
    type?: 'submit' | 'button';
    styles?: string;
    isDisabled?: boolean;
    isLoading?: boolean;
    callback?: (arg?: any) => void;
}

export const Button = ({
    title,
    type = 'button',
    styles = '',
    isDisabled = false,
    isLoading = false,
    callback = undefined,
    ...rest
}: ButtonProps) => {
    return (
        <button
            title={title}
            aria-label={title}
            aria-disabled={isDisabled || isLoading}
            disabled={isDisabled || isLoading}
            type={type}
            className={clsx(
                `bg-primary hover:bg-primary/90 text-white font-medium rounded-lg transition-colors p-2 px-4 ${styles}`,
                isDisabled && 'bg-primary/80 hover:bg-primary/80 cursor-not-allowed',
                isLoading && 'bg-primary/80 hover:bg-primary/80 cursor-wait'
            )}
            onClick={callback}
            {...rest}
        >
            {title}
        </button>
    );
};
