import clsx from 'clsx';
import { useCopyToClipboard } from './useCopyToClipboard';

interface SingleValueProps {
    name: string;
    value: string;
}

export const SingleValue = ({ name, value }: SingleValueProps) => {
    const { wasCopied, copy } = useCopyToClipboard();

    const handleCopy = () => copy(value);

    return (
        <div className="w-full flex justify-between gap-1 text-base md:text-lg">
            <span className="font-medium">{name}:</span>

            <button
                data-testid={`${name}-value`}
                aria-label="Copy to clipboard"
                className={clsx('hover:underline transition-colors ease-in-out', wasCopied && 'text-green-500')}
                onClick={handleCopy}
            >
                {value}
            </button>
        </div>
    );
};
