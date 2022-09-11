import * as RadixTooltip from '@radix-ui/react-tooltip';

interface TriggerProps {
    count: number;
}

export const Trigger = ({ count }: TriggerProps) => {
    return (
        <RadixTooltip.Trigger>
            <span className="font-semibold hover:underline">{count} more</span>
        </RadixTooltip.Trigger>
    );
};
