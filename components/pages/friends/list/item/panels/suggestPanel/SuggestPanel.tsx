import { ErrorMessage } from '@components/pages/friends/list/item/panels/ErrorMessage';
import type { IUser } from '@utils/types';
import { useInvite } from './useInvite';
import { PanelButton } from '../PanelButton';

interface SuggestPanelProps extends IUser {}

export const SuggestPanel = ({ id }: SuggestPanelProps) => {
    const { invite, isLoading, isError } = useInvite();

    const handleInvite = () => {
        invite(id);
    };

    if (isError) return <ErrorMessage message="Something went wrong, try again later" />;

    return <PanelButton title="Invite" isLoading={isLoading} callback={handleInvite} />;
};
