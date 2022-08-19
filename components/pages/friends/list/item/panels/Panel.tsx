import { FriendPanel } from '@components/pages/friends/list/item/panels/friendPanel/FriendPanel';
import { InvitePanel } from '@components/pages/friends/list/item/panels/invitePanel/InvitePanel';
import { SuggestPanel } from '@components/pages/friends/list/item/panels/suggestPanel/SuggestPanel';
import { PokePanel } from '@components/pages/friends/list/item/panels/PokePanel';

import type { IFriendsListItem, IFriendsList, IPoke } from '@utils/types';

interface PanelProps {
    item: IFriendsListItem;
    listType: IFriendsList;
}

export const Panel = ({ item, listType }: PanelProps) => {
    if (isPoke(item)) return <PokePanel {...item} />;

    const { friend } = item;

    if (listType === 'Suggests') return <SuggestPanel {...friend} />;
    if (listType === 'Invites') return <InvitePanel {...friend} />;
    return <FriendPanel {...friend} />;
};

const isPoke = (x: IFriendsListItem): x is IPoke => {
    return x.hasOwnProperty('data');
};
