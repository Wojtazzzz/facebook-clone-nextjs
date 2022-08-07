import { ErrorMessage } from '@components/pages/friends/list/item/panels/messages/ErrorMessage';
import { SuccessMessage } from '@components/pages/friends/list/item/panels/messages/SuccessMessage';
import { Button } from '@components/inc/Button';

import type { IUser } from '@utils/types';
import { useFriendship } from '@hooks/useFriendship';

interface SuggestPanelProps extends IUser {}

export const SuggestPanel = ({ id }: SuggestPanelProps) => {
    const { useInvite } = useFriendship();
    const { invite, isLoading, isError, isSuccess } = useInvite();

    const handleInvite = (event: FocusEvent) => {
        event.preventDefault();
        invite(id);
    };

    if (isSuccess) return <SuccessMessage message="Request sent successfully" />;
    if (isError) return <ErrorMessage message="Something went wrong, try again later" />;

    return <Button title="Invite" styles="w-[150px]" isDisabled={isLoading} callback={handleInvite} />;
};
