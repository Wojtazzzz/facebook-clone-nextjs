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
            <a
                aria-label={`See ${name} profile`}
                className="flex items-center gap-2 md:gap-5 hover:bg-dark-100 rounded-lg transition-colors py-1 md:py-3 px-2 sm:px-3 md:px-4 lg:px-5 xl:px-6"
            >
                <Avatar
                    src={profile_image}
                    alt={name}
                    styles="w-[55px] h-[55px] sm:w-[80px] sm:h-[80px] md:w-[96px] md:h-[96px]"
                />

                <span className="text-sm md:text-lg lg:text-xl text-light-200 font-medium">{name}</span>

                <div className="ml-auto">
                    <Panel item={item} listType={type} />
                </div>
            </a>
        </Link>
    );
};
