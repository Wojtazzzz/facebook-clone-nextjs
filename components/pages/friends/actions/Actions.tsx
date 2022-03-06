import * as React from 'react';

import { FriendActions } from '@components/pages/friends/actions/FriendActions';
import { InviteActions } from '@components/pages/friends/actions/InviteActions';
import { SuggestActions } from '@components/pages/friends/actions/SuggestActions';
import { PokeActions } from '@components/pages/friends/actions/PokeActions';

import { ListType } from '@enums/ListType';

import type { UserType } from '@ctypes/features/UserType';

interface ActionsProps {
	friend: UserType;
	type: ListType;
}

export const Actions = ({ friend, type }: ActionsProps) => {
	if (type === ListType.SUGGEST) return <SuggestActions friend={friend} />;
	if (type === ListType.INVITES) return <InviteActions friend={friend} />;
	if (type === ListType.POKES) return <PokeActions friend={friend} />;
	return <FriendActions friend={friend} />;
};
