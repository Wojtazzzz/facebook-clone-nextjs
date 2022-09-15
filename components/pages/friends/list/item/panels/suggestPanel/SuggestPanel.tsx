import { ErrorMessage } from '@components/pages/friends/list/item/panels/ErrorMessage';
import { Button } from '@components/inc/Button';
import type { IUser } from '@utils/types';
import { useInvite } from './useInvite';

interface SuggestPanelProps extends IUser {}

export const SuggestPanel = ({ id }: SuggestPanelProps) => {
    const { invite, isLoading, isError } = useInvite();

    const handleInvite = (event: FocusEvent) => {
        event.preventDefault();
        invite(id);
    };

    if (isError) return <ErrorMessage message="Something went wrong, try again later" />;

    return <Button title="Invite" styles="w-[150px]" isDisabled={isLoading} callback={handleInvite} />;
};
