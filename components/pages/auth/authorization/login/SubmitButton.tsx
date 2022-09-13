import { Button } from '@components/inc/Button';
import type { ILoginPayload } from '@utils/types';
import { useFormikContext } from 'formik';

interface SubmitButtonProps {
    isDisabled: boolean;
}

export const SubmitButton = ({ isDisabled }: SubmitButtonProps) => {
    const { handleSubmit } = useFormikContext<ILoginPayload>();

    return <Button type="submit" title="Login" isDisabled={isDisabled} callback={handleSubmit} styles="w-full mt-4" />;
};
