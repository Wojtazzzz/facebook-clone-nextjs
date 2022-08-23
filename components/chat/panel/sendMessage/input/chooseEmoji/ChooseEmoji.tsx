import * as ReactTooltip from '@radix-ui/react-tooltip';
import { useState } from 'react';
import { Emojis } from './emojis/Emojis';
import { TriggerButton } from './TriggerButton';

interface ChooseEmojiProps {}

export const ChooseEmoji = ({}: ChooseEmojiProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    return (
        <ReactTooltip.Root open={isOpen} disableHoverableContent={true} delayDuration={0}>
            <TriggerButton open={handleOpen} />
            <Emojis close={handleClose} />
        </ReactTooltip.Root>
    );
};
