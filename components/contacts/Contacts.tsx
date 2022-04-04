import { useAuth } from '@hooks/useAuth';

import { Header } from '@components/contacts/Header';
import { List } from '@components/contacts/List';
import { Loader } from '@components/contacts/shared/Loader';

export const Contacts = () => {
    const { user } = useAuth();

    return (
        <aside className="w-full max-w-[250px] xl:max-w-[300px] h-screen hidden md:flex flex-col px-2 pr-4 py-5 overflow-y-scroll pb-16">
            <Header />
            {user ? <List userId={user.id} /> : <Loader />}
        </aside>
    );
};
