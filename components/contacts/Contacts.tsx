import * as React from 'react';
import { useState, useEffect } from 'react';

import { Header } from '@components/contacts/Header';
import { ContactItem } from '@components/contacts/ContactItem';
import axios from '@lib/axios';


export const Contacts: React.FC = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('/api/users')
            .then(response => setUsers(response.data.users))
    }, []);

    const UsersComponent = users.map(({ id, first_name, last_name }) => (
        <ContactItem
            key={id}
            first_name={first_name}
            last_name={last_name}
        />
    ));

    return (
        <aside className="w-[300px] h-screen flex flex-col px-2 pr-4 py-5 overflow-y-scroll pb-14">
            <Header />

            <div className="w-full">
                {UsersComponent}
            </div>
        </aside>
    );
}