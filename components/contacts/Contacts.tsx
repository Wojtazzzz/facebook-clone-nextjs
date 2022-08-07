import { Header } from '@components/contacts/header/Header';
import { List } from '@components/contacts/list/List';

export const Contacts = () => {
    return (
        <aside className="w-full max-w-[250px] xl:max-w-[300px] h-screen hidden md:flex flex-col px-2 pr-4 py-5 overflow-y-scroll pb-16">
            <Header />
            <List />
        </aside>
    );
};
