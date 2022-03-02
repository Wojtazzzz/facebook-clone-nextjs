import * as React from 'react';

import { FriendActions } from '@components/pages/friends/actions/FriendActions';
import { InviteActions } from '@components/pages/friends/actions/InviteActions';
import { SuggestActions } from '@components/pages/friends/actions/SuggestActions';

import { ListType } from '@enums/ListType';

import type { UserType } from '@ctypes/features/UserType';

interface ActionsProps {
	friend: UserType;
	type: ListType;
}

export const Actions: React.FC<ActionsProps> = ({ friend, type }) => {
	if (type === ListType.SUGGEST) return <SuggestActions friend={friend} />;
	if (type === ListType.INVITES) return <InviteActions friend={friend} />;
	return <FriendActions friend={friend} />;
};
