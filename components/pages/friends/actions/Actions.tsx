import * as React from 'react';

import { FriendActions } from '@components/pages/friends/actions/FriendActions';
import { InviteActions } from '@components/pages/friends/actions/InviteActions';
import { SuggestActions } from '@components/pages/friends/actions/SuggestActions';

import { ListType } from '@enums/ListType';


interface ActionsProps {
    id: number,
    type: ListType
}

export const Actions: React.FC<ActionsProps> = ({ id, type }) => {
    if (type === ListType.SUGGEST) return <SuggestActions id={id} />;
    if (type === ListType.INVITES) return <InviteActions id={id} />;
    return <FriendActions id={id} />;
}