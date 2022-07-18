import { Header } from '@components/pages/friends/Header';
import { List } from '@components/pages/friends/List';

import type { IFriendsList } from '@utils/types';

interface FriendsProps {
    type: IFriendsList;
}

export const Friends = ({ type }: FriendsProps) => {
    return (
        <div className="relative py-5 px-2">
            <Header title={type} />
            <List type={type} />
        </div>
    );
};
