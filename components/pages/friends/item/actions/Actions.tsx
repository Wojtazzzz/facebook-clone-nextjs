import { FriendActions } from '@components/pages/friends/item/actions/FriendActions';
import { InviteActions } from '@components/pages/friends/item/actions/InviteActions';
import { SuggestActions } from '@components/pages/friends/item/actions/SuggestActions';
import { PokeActions } from '@components/pages/friends/item/actions/PokeActions';

import type { IFriendsListItem, IFriendsList, IPoke } from '@utils/types';

interface ActionsProps {
    item: IFriendsListItem;
    listType: IFriendsList;
}

export const Actions = ({ item, listType }: ActionsProps) => {
    if (isPoke(item)) return <PokeActions {...item} />;

    const { friend } = item;

    if (listType === 'Suggests') return <SuggestActions {...friend} />;
    if (listType === 'Invites') return <InviteActions {...friend} />;
    return <FriendActions {...friend} />;
};

const isPoke = (x: IFriendsListItem): x is IPoke => {
    return x.hasOwnProperty('data');
};
