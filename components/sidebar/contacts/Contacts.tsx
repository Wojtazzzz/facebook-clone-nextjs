import { Header } from '@components/sidebar/contacts/header/Header';
import { List } from '@components/sidebar/contacts/list/List';

export const Contacts = () => {
    return (
        <div data-testid="contacts" className="w-full">
            <Header />
            <List />
        </div>
    );
};
