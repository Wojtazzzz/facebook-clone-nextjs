import { ErrorMessage } from '@components/pages/friends/list/item/panels/ErrorMessage';
import type { IUser } from '@utils/types';
import { useInviteFriend } from './useInviteFriend';
import { PanelButton } from '../PanelButton';
import { SuccessMessage } from '../SuccessMessage';

interface SuggestPanelProps extends IUser {}

export const SuggestPanel = ({ id }: SuggestPanelProps) => {
    const { invite, isLoading, isSuccess, isError } = useInviteFriend();

    const handleInvite = () => {
        invite(id);
    };

    if (isError) return <ErrorMessage message="Something went wrong, try again later" />;
    if (isSuccess) return <SuccessMessage message="User successfully invited" />;

    return <PanelButton title="Invite" isLoading={isLoading} callback={handleInvite} />;
};
