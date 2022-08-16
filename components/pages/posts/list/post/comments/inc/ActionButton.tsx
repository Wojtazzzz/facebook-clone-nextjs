import clsx from 'clsx';

interface ActionButtonProps {
    title: string;
    isDisabled?: boolean;
    callback: () => void;
}

export const ActionButton = ({ title, isDisabled = false, callback }: ActionButtonProps) => {
    return (
        <button
            aria-label={title}
            disabled={isDisabled}
            className={clsx(
                'text-xs transition-colors font-bold cursor-pointer',
                isDisabled ? 'text-light-200' : 'text-light-100 hover:text-light-200'
            )}
            onClick={callback}
        >
            {title}
        </button>
    );
};
