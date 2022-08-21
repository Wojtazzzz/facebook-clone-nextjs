import clsx from 'clsx';

interface TextProps {
    text: string;
    createdAt: string;
    isReceived: boolean;
}

export const Text = ({ text, createdAt, isReceived }: TextProps) => {
    return (
        <div className="w-full">
            <div
                title={createdAt}
                className={clsx(
                    'w-fit max-w-[205px] text-sm text-light-50 break-words py-2 px-3',
                    isReceived ? 'bg-dark-100 rounded-[18px]' : 'bg-primary rounded-[18px] ml-auto'
                )}
            >
                {text}
            </div>
        </div>
    );
};
