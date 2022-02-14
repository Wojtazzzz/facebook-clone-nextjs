import * as React from 'react';
import { useEffect } from 'react';
import { useAuth } from '@hooks/useAuth';

import { Header } from '@components/contacts/Header';
import { ContactItem } from '@components/contacts/ContactItem';
import { UserType } from '@ctypes/features/UserType';


export const Contacts: React.FC = () => {
    const { user } = useAuth();

    const UsersComponent = new Array;

    if (user) {
        user.friends.map(friend => {
            UsersComponent.push(
                <ContactItem
                    key={friend.id}
                    {...friend}
                />
            )
        })
    }

    return (
        <aside className="w-[300px] h-screen flex flex-col px-2 pr-4 py-5 overflow-y-scroll pb-14">
            <Header />

            <div className="w-full">
                {UsersComponent}
            </div>
        </aside>
    );
}