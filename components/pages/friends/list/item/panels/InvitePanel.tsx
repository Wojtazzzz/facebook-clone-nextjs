import { ErrorMessage } from '@components/pages/friends/list/item/panels/messages/ErrorMessage';
import { SuccessMessage } from '@components/pages/friends/list/item/panels/messages/SuccessMessage';
import { Button } from '@components/inc/Button';

import type { IUser } from '@utils/types';
import { useFriendship } from '@hooks/useFriendship';

interface InvitePanelProps extends IUser {}

export const InvitePanel = ({ id }: InvitePanelProps) => {
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

    if (isSuccess) return <SuccessMessage message={data?.data.message} />;
    if (isError) return <ErrorMessage message="Something went wrong, try again later" />;

    return (
        <div className="flex gap-3">
            <Button title="Reject" styles="w-[100px]" isDisabled={isLoading} callback={handleReject} />
            <Button title="Accept" styles="w-[100px]" isDisabled={isLoading} callback={handleAccept} />
        </div>
    );
};