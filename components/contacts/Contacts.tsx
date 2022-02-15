import * as React from 'react';
import { useAuth } from '@hooks/useAuth';

import { Header } from '@components/contacts/Header';
import { ContactItem } from '@components/contacts/ContactItem';


export const Contacts: React.FC = () => {
    const { user } = useAuth();

    const ContactsComponent: React.ReactFragment[] = [];

    if (user) {
        user.friends.map(friend =>
            ContactsComponent.push(
                <ContactItem
                    key={friend.id}
                    {...friend}
                />
            )
        );
    }

    return (
        <aside className="w-full max-w-[250px] xl:max-w-[300px] h-screen flex flex-col px-2 pr-4 py-5 overflow-y-scroll pb-14">
            <Header />

            <div className="w-full">
                {ContactsComponent}
            </div>
        </aside>
    );
}