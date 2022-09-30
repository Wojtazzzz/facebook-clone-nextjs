import clsx from 'clsx';

interface ActionButtonProps {
    title: string;
    isLoading?: boolean;
    styles?: string;
    callback: () => void;
}

export const ActionButton = ({ title, isLoading = false, styles = '', callback }: ActionButtonProps) => {
    return (
        <button
            aria-label={title}
            disabled={isLoading}
            className={clsx(
                'text-xs transition-colors font-bold cursor-pointer',
                isLoading ? 'text-light-200 cursor-wait' : 'text-light-100 hover:text-light-200',
                styles
            )}
            onClick={callback}
        >
            {title}
        </button>
    );
};
