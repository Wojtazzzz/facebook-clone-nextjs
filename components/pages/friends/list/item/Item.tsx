/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import { Avatar } from '@components/inc/Avatar';
import { Panel } from '@components/pages/friends/list/item/panels/Panel';

import type { IFriendsListItem, IFriendsList } from '@utils/types';

interface ItemProps {
    item: IFriendsListItem;
    type: IFriendsList;
}

export const Item = ({ item, type }: ItemProps) => {
    const { id, name, profile_image } = item.friend;

    return (
        <Link href={`/profile/${id}`}>
            <a className="flex items-center gap-5 hover:bg-dark-100 rounded-lg transition-colors py-3 px-5">
                <Avatar size={85} src={profile_image} alt={name} />

                <span className="md:text-xl text-light-200 font-medium">{name}</span>

                <div className="ml-auto">
                    <Panel item={item} listType={type} />
                </div>
            </a>
        </Link>
    );
};
