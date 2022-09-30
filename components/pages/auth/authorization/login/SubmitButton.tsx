import { Button } from '@components/inc/Button';
import type { ILoginPayload } from '@utils/types';
import { useFormikContext } from 'formik';

interface SubmitButtonProps {
    isLoading: boolean;
}

export const SubmitButton = ({ isLoading }: SubmitButtonProps) => {
    const { handleSubmit } = useFormikContext<ILoginPayload>();

    return <Button type="submit" title="Login" isLoading={isLoading} callback={handleSubmit} styles="w-full mt-4" />;
};
