import { Failure } from '@components/pages/friends/item/actions/responses/Failure';
import { Success } from '@components/pages/friends/item/actions/responses/Success';
import { Button } from '@components/inc/Button';

import type { IUser } from '@utils/types';
import { useFriendship } from '@hooks/useFriendship';

interface SuggestActionsProps extends IUser {}

export const SuggestActions = ({ id }: SuggestActionsProps) => {
    const { useInvite } = useFriendship();
    const { invite, isLoading, isError, isSuccess } = useInvite();

    const handleInvite = (event: FocusEvent) => {
        event.preventDefault();
        invite(id);
    };

    if (isSuccess) return <Success message="Request sent successfully" />;
    if (isError) return <Failure message="Something went wrong, try again later" />;

    return <Button title="Invite" styles="w-[150px]" isDisabled={isLoading} callback={handleInvite} />;
};
