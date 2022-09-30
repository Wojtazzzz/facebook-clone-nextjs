import { ErrorMessage } from '@components/pages/friends/list/item/panels/ErrorMessage';
import type { IUser } from '@utils/types';
import { useUpdateInvite } from './useUpdateInvite';
import { PanelButton } from '../PanelButton';

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
            <PanelButton title="Reject" isLoading={isLoading} callback={handleReject} />
            <PanelButton title="Accept" isLoading={isLoading} callback={handleAccept} />
        </div>
    );
};
