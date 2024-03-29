import { ErrorMessage } from '@components/pages/friends/list/item/panels/ErrorMessage';
import type { IUser } from '@utils/types';
import { useUpdateInvite } from './useUpdateInvite';
import { PanelButton } from '../PanelButton';
import { SuccessMessage } from '../SuccessMessage';
import { useConfirmModal } from '@hooks/useConfirmModal';

interface InvitePanelProps extends IUser {}

export const InvitePanel = ({ id }: InvitePanelProps) => {
    const { updateInvite, isError, isSuccess, isLoading } = useUpdateInvite();
    const { confirm } = useConfirmModal();

    const handleAccept = () => {
        updateInvite({
            friendId: id,
            status: 'CONFIRMED',
        });
    };

    const handleReject = (event: FocusEvent) => {
        event.preventDefault();

        confirm('Are you sure you want to reject request from this user?', () =>
            updateInvite({
                friendId: id,
                status: 'BLOCKED',
            })
        );
    };

    if (isError) return <ErrorMessage message="Something went wrong, try again later" />;
    if (isSuccess) return <SuccessMessage message="Response successfully sent" />;

    return (
        <div className="flex gap-3">
            <PanelButton title="Reject" isLoading={isLoading} callback={handleReject} />
            <PanelButton title="Accept" isLoading={isLoading} callback={handleAccept} />
        </div>
    );
};
