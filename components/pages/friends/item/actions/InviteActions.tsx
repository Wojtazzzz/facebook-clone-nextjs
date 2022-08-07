import { Failure } from '@components/pages/friends/item/actions/responses/Failure';
import { Success } from '@components/pages/friends/item/actions/responses/Success';
import { Button } from '@components/inc/Button';

import type { IUser } from '@utils/types';
import { useFriendship } from '@hooks/useFriendship';

interface InviteActionsProps extends IUser {}

export const InviteActions = ({ id }: InviteActionsProps) => {
    const { useUpdateInvite } = useFriendship();
    const { updateInvite, isSuccess, isError, isLoading, data } = useUpdateInvite();

    const handleAccept = (event: FocusEvent) => {
        event.preventDefault();

        updateInvite(id, 'CONFIRMED');
    };

    const handleReject = (event: FocusEvent) => {
        event.preventDefault();

        updateInvite(id, 'BLOCKED');
    };

    if (isSuccess) return <Success message={data?.data.message} />;
    if (isError) return <Failure message="Something went wrong, try again later" />;

    return (
        <div className="flex gap-3">
            <Button title="Reject" styles="w-[100px]" isDisabled={isLoading} callback={handleReject} />
            <Button title="Accept" styles="w-[100px]" isDisabled={isLoading} callback={handleAccept} />
        </div>
    );
};
