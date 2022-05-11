interface ActionButtonProps {
    title: string;
    callback: () => void;
}

export const ActionButton = ({ title, callback }: ActionButtonProps) => {
    return (
        <button
            aria-label={title}
            className="text-xs text-light-100 hover:text-light-200 transition-colors font-bold cursor-pointer"
            onClick={callback}
        >
            {title}
        </button>
    );
};
