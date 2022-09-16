import { Button } from '@components/inc/Button';

interface PanelButtonProps {
    title: string;
    isDisabled: boolean;
    callback: (event: FocusEvent) => void;
}

export const PanelButton = ({ title, isDisabled, callback }: PanelButtonProps) => {
    return (
        <Button
            title={title}
            styles="w-[70px] sm:w-[100px] lg:w-[120px] text-xs sm:text-sm md:text-base py-2 sm:py-3 px-1"
            isDisabled={isDisabled}
            callback={callback}
        />
    );
};
