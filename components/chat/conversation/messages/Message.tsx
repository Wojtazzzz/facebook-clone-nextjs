import { clsx } from 'clsx';
import type { IChatMessage } from '@utils/types';

interface MessageProps extends IChatMessage {}

export const Message = ({ text, isReceived, created_at }: MessageProps) => {
    return (
        <article aria-label={isReceived ? 'Received message' : 'Sent message'} className="w-full">
            <div
                title={created_at}
                className={clsx(
                    'w-fit max-w-[75%] text-sm text-light-50 py-2 px-3',
                    isReceived && 'bg-dark-100 rounded-r-2xl',
                    !isReceived && 'bg-primary rounded-l-2xl ml-auto'
                )}
            >
                {text}
            </div>
        </article>
    );
};
