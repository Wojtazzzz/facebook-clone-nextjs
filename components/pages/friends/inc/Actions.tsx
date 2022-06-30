import { FriendActions } from '@components/pages/friends/actions/FriendActions';
import { InviteActions } from '@components/pages/friends/actions/InviteActions';
import { SuggestActions } from '@components/pages/friends/actions/SuggestActions';
import { PokeActions } from '@components/pages/friends/actions/PokeActions';

import type { UserType } from '@ctypes/features/UserType';
import type { PokingUserType } from '@ctypes/features/PokingUserType';
import type { FriendsListType } from '@ctypes/FriendsListType';

interface ActionsProps {
    friend: UserType;
    listType: FriendsListType;
}

export const Actions = ({ friend, listType }: ActionsProps) => {
    if (listType === 'SUGGESTS') return <SuggestActions friend={friend} />;
    if (listType === 'INVITES') return <InviteActions friend={friend} />;
    if (listType === 'POKES') return <PokeActions friend={friend as PokingUserType} />;
    return <FriendActions friend={friend} />;
};
