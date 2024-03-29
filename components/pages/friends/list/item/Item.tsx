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
        <article
            aria-label={name}
            className="flex items-center gap-2 md:gap-5 hover:bg-dark-100 rounded-lg transition-colors py-2 md:py-3 px-2 sm:px-3 md:px-4 lg:px-5 xl:px-6"
        >
            <Link href={`/profile/${id}`}>
                <a>
                    <Avatar
                        src={profile_image}
                        alt={name}
                        styles="w-[55px] h-[55px] sm:w-[80px] sm:h-[80px] md:w-[96px] md:h-[96px]"
                    />
                </a>
            </Link>

            <Link href={`/profile/${id}`}>
                <a className="text-sm md:text-lg lg:text-xl text-light-200 hover:underline font-medium">{name}</a>
            </Link>

            <div className="ml-auto">
                <Panel item={item} listType={type} />
            </div>
        </article>
    );
};
