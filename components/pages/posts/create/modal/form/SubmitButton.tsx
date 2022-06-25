import { Button } from '@components/inc/Button';

interface SubmitButtonProps {
    isDisabled: boolean;
}

export const SubmitButton = ({ isDisabled }: SubmitButtonProps) => {
    return <Button type="submit" title="Create post" isDisabled={isDisabled} styles="w-full mt-5" />;
};
