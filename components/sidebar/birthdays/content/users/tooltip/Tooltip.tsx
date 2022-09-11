import * as RadixTooltip from '@radix-ui/react-tooltip';
import type { IBirthday } from '@utils/types';
import { Content } from './Content';
import { Trigger } from './Trigger';

interface TooltipProps {
    birthdays: IBirthday[];
}

export const Tooltip = ({ birthdays }: TooltipProps) => {
    return (
        <RadixTooltip.Provider>
            <RadixTooltip.Root>
                <Trigger count={birthdays.length} />
                <Content birthdays={birthdays} />
            </RadixTooltip.Root>
        </RadixTooltip.Provider>
    );
};
