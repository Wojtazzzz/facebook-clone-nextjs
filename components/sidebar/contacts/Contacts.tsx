import { Header } from '@components/sidebar/contacts/header/Header';
import { List } from '@components/sidebar/contacts/list/List';

export const Contacts = () => {
    const headingId = 'sidebar-contacts-heading';

    return (
        <section data-testid="contacts" aria-labelledby={headingId} className="w-full">
            <Header headingId={headingId} />
            <List />
        </section>
    );
};
