import * as ReactTooltip from '@radix-ui/react-tooltip';
import { Emojis } from './emojis/Emojis';
import { TriggerButton } from './TriggerButton';
import { useEmojisActive } from './useEmojisActive';

interface ChooseEmojiProps {
    addToContent: (emoji: string) => void;
}

export const ChooseEmoji = ({ addToContent }: ChooseEmojiProps) => {
    const { isActive, open, close } = useEmojisActive();

    return (
        <ReactTooltip.Root open={isActive} disableHoverableContent={true} delayDuration={0}>
            <TriggerButton open={open} />
            <Emojis addToContent={addToContent} close={close} />
        </ReactTooltip.Root>
    );
};
