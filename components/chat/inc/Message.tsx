import type { ChatMessageType } from '@ctypes/features/ChatMessageType';

interface MessageProps extends ChatMessageType {}

export const Message = ({ text, isReceived, created_at }: MessageProps) => {
    return (
        <div className="w-full">
            <div
                title={`Wysłono:  ${created_at}`}
                className={`w-fit max-w-[75%] ${
                    isReceived ? 'bg-dark-100 rounded-r-2xl' : 'bg-primary rounded-l-2xl ml-auto'
                } text-light-50 py-2 px-3`}
            >
                {text}
            </div>
        </div>
    );
};
