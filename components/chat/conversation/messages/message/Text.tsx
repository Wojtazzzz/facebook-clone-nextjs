import clsx from 'clsx';

interface TextProps {
    text?: string;
    createdAt: string;
    isReceived: boolean;
}

export const Text = ({ text, createdAt, isReceived }: TextProps) => {
    if (!text) return null;

    return (
        <div data-testid="message-text" className="w-full">
            <div
                title={createdAt}
                className={clsx(
                    'w-fit max-w-[205px] text-[0.9375rem] leading-5 text-white break-words py-2 px-3',
                    isReceived ? 'bg-dark-100 rounded-[18px]' : 'bg-primary rounded-[18px]'
                )}
            >
                {text}
            </div>
        </div>
    );
};
