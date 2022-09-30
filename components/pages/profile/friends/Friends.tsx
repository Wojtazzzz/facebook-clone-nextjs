import { useSearchQuery } from '@components/nav/search/searchEngine/useSearchQuery';
import type { IUserProfile } from '@utils/types';
import { Header } from './header/Header';
import { List } from './list/List';

interface FriendsProps {
    user: IUserProfile;
}

export const Friends = ({ user }: FriendsProps) => {
    const { query, debounceQuery, changeQuery, clearQuery } = useSearchQuery();

    return (
        <section data-testid="profile-friends" className="w-full flex flex-col gap-5 p-2">
            <Header query={query} changeQuery={changeQuery} clearQuery={clearQuery} />
            <List userId={user.id} query={debounceQuery} />
        </section>
    );
};
