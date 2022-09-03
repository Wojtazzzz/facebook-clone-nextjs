import type { IPostType } from '@utils/types';
import { useSettings } from './useSettings';
import * as RadixPopover from '@radix-ui/react-popover';
import { Trigger } from './Trigger';
import { Popover } from './popover/Popover';

interface SettingsProps {
    postId: number;
    type: IPostType;
    commenting: boolean;
    queryKey: unknown[];
}

export const Settings = (props: SettingsProps) => {
    const { isActive, open, close } = useSettings();

    return (
        <RadixPopover.Root open={isActive}>
            <Trigger open={open} />
            <Popover {...props} close={close} />
        </RadixPopover.Root>
    );
};
