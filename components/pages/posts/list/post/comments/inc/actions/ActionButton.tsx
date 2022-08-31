import clsx from 'clsx';

interface ActionButtonProps {
    title: string;
    isDisabled?: boolean;
    styles?: string;
    callback: () => void;
}

export const ActionButton = ({ title, isDisabled = false, styles = '', callback }: ActionButtonProps) => {
    return (
        <button
            aria-label={title}
            disabled={isDisabled}
            className={clsx(
                'text-xs transition-colors font-bold cursor-pointer',
                isDisabled ? 'text-light-200' : 'text-light-100 hover:text-light-200',
                styles
            )}
            onClick={callback}
        >
            {title}
        </button>
    );
};
