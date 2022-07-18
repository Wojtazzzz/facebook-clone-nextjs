import { FriendActions } from '@components/pages/friends/item/actions/FriendActions';
import { InviteActions } from '@components/pages/friends/item/actions/InviteActions';
import { SuggestActions } from '@components/pages/friends/item/actions/SuggestActions';
import { PokeActions } from '@components/pages/friends/item/actions/PokeActions';

import type { IFriendsListItem, IFriendsList } from '@utils/types';

interface ActionsProps extends IFriendsListItem {
    listType: IFriendsList;
}

export const Actions = ({ friend, data, listType }: ActionsProps) => {
    if (listType === 'Suggests') return <SuggestActions friend={friend} />;
    if (listType === 'Invites') return <InviteActions friend={friend} />;
    if (listType === 'Pokes' && data) return <PokeActions friend={friend} data={data} />;
    return <FriendActions friend={friend} />;
};
