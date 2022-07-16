import { FriendActions } from '@components/pages/friends/actions/FriendActions';
import { InviteActions } from '@components/pages/friends/actions/InviteActions';
import { SuggestActions } from '@components/pages/friends/actions/SuggestActions';
import { PokeActions } from '@components/pages/friends/actions/PokeActions';

import type { IUser } from '@utils/types';
import type { IPokingUser } from '@utils/types';
import type { IFriendsList } from '@utils/types';

interface ActionsProps {
    friend: IUser;
    listType: IFriendsList;
}

export const Actions = ({ friend, listType }: ActionsProps) => {
    if (listType === 'SUGGESTS') return <SuggestActions friend={friend} />;
    if (listType === 'INVITES') return <InviteActions friend={friend} />;
    if (listType === 'POKES') return <PokeActions friend={friend as IPokingUser} />;
    return <FriendActions friend={friend} />;
};
