import { FriendActions } from '@components/pages/friends/actions/FriendActions';
import { InviteActions } from '@components/pages/friends/actions/InviteActions';
import { SuggestActions } from '@components/pages/friends/actions/SuggestActions';
import { PokeActions } from '@components/pages/friends/actions/PokeActions';

import type { UserType } from '@ctypes/features/UserType';
import type { PokingUserType } from '@ctypes/features/PokingUserType';

interface ActionsProps {
    friend: UserType;
    type: string | string[] | undefined;
}

export const Actions = ({ friend, type }: ActionsProps) => {
    if (type === 'suggests') return <SuggestActions friend={friend} />;
    if (type === 'invites') return <InviteActions friend={friend} />;
    if (type === 'pokes') return <PokeActions friend={friend as PokingUserType} />;
    return <FriendActions friend={friend} />;
};
