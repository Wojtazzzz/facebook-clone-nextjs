import * as React from 'react';

import { FriendActions } from './FriendActions';
import { InviteActions } from './InviteActions';
import { SuggestActions } from './SuggestActions';

import { FriendsLists } from '@enums/FriendsType';


interface ActionsProps {
    id: number,
    type: FriendsLists
}

export const Actions: React.FC<ActionsProps> = ({ id, type }) => {
    if (type === FriendsLists.SUGGEST) return <SuggestActions id={id} />;
    if (type === FriendsLists.INVITES) return <InviteActions id={id} />;
    return <FriendActions id={id} />;
}