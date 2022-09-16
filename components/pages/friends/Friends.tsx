import { Header } from '@components/pages/friends/header/Header';
import { List } from '@components/pages/friends/list/List';
import type { IFriendsList } from '@utils/types';

interface FriendsProps {
    type: IFriendsList;
}

export const Friends = ({ type }: FriendsProps) => {
    const path = getApiPath(type);

    return (
        <div className="w-full max-w-[1200px] relative mx-auto py-1 md:py-3 lg:pl-[250px] xl:pl-[300px] box-content">
            <Header title={type} />
            <List path={path} type={type} />
        </div>
    );
};

const getApiPath = (type: IFriendsList) => {
    const paths = {
        Friends: '/api/friends',
        Invites: '/api/invites',
        Suggests: '/api/suggests',
        Pokes: '/api/pokes',
    } as const;

    return paths[type];
};
