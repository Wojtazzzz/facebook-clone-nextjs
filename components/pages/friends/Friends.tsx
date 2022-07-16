import { useRouter } from 'next/router';
import { useAuth } from '@hooks/useAuth';

import Custom404 from '@pages/404';
import { Header } from '@components/pages/friends/Header';
import { List } from '@components/pages/friends/List';
import { Loader } from '@components/pages/friends/inc/Loader';

import { isFriendsListType } from '@utils/isFriendsListType';

import type { IFriendsList } from '@utils/types';

export const Friends = () => {
    const {
        query: { type },
    } = useRouter();
    const { user } = useAuth();

    const parsedType = type?.toString().toUpperCase() as IFriendsList;

    if (!isFriendsListType(parsedType)) return <Custom404 />;

    return (
        <div className="relative py-5 px-2">
            <Header name={parsedType} />

            {user ? <List userId={user.id} listType={parsedType} /> : <Loader />}
        </div>
    );
};
