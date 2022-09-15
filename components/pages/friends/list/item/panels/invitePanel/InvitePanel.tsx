import { ErrorMessage } from '@components/pages/friends/list/item/panels/ErrorMessage';
import { Button } from '@components/inc/Button';
import type { IUser } from '@utils/types';
import { useUpdateInvite } from './useUpdateInvite';

interface InvitePanelProps extends IUser {}

export const InvitePanel = ({ id }: InvitePanelProps) => {
    const { updateInvite, isError, isLoading } = useUpdateInvite();

    const handleAccept = (event: FocusEvent) => {
        event.preventDefault();

        updateInvite({
            friendId: id,
            status: 'CONFIRMED',
        });
    };

    const handleReject = (event: FocusEvent) => {
        event.preventDefault();

        updateInvite({
            friendId: id,
            status: 'BLOCKED',
        });
    };

    if (isError) return <ErrorMessage message="Something went wrong, try again later" />;

    return (
        <div className="flex gap-3">
            <Button title="Reject" styles="w-[100px]" isDisabled={isLoading} callback={handleReject} />
            <Button title="Accept" styles="w-[100px]" isDisabled={isLoading} callback={handleAccept} />
        </div>
    );
};
