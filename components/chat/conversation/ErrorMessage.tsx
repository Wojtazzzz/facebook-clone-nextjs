import { useChat } from '@hooks/useChat';

export const ErrorMessage = () => {
    const { error } = useChat();

    if (!error) {
        return null;
    }

    return (
        <div className="w-full text-center absolute top-0 left-0 border-b-[1px] bg-dark-200 border-dark-100 p-1">
            <span className="text-xs text-light-100">{error}</span>
        </div>
    );
};
