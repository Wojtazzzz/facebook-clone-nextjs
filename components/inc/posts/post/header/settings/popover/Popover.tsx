import * as RadixPopover from '@radix-ui/react-popover';
import type { IPostType } from '@utils/types';
import { GlobalOptions } from './options/globalOptions/GlobalOptions';
import { Options } from './options/Options';

interface PopoverProps {
    postId: number;
    type: IPostType;
    commenting: boolean;
    close: () => void;
}

export const Popover = ({ postId, type, commenting, close }: PopoverProps) => {
    return (
        <RadixPopover.Portal>
            <RadixPopover.Content onEscapeKeyDown={close} onInteractOutside={close}>
                <div
                    aria-label="Settings"
                    className="min-w-[240px] absolute right-0 z-20 bg-dark-300 shadow-md rounded-xl py-3 px-4"
                >
                    <Options postId={postId} commenting={commenting} type={type} close={close} />

                    <GlobalOptions />
                </div>

                <RadixPopover.Arrow />
            </RadixPopover.Content>
        </RadixPopover.Portal>
    );
};
