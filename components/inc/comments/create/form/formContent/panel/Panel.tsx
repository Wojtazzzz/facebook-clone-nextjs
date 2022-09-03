import { ChooseEmoji } from '@components/inc/chooseEmoji/ChooseEmoji';
import { SubmitButton } from './SubmitButton';
import { useAddEmojiToComment } from './useAddEmojiToComment';

interface PanelProps {
    isLoading: boolean;
}

export const Panel = ({ isLoading }: PanelProps) => {
    const { addToComment } = useAddEmojiToComment();

    return (
        <div className="flex gap-2">
            <ChooseEmoji addToContent={addToComment} />
            <SubmitButton isLoading={isLoading} />
        </div>
    );
};
