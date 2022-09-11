import { useRouter } from 'next/router';
import { Birthdays } from './birthdays/Birthdays';
import { Contacts } from './contacts/Contacts';

export const Sidebar = () => {
    const { route } = useRouter();

    if (route !== '/') return null;

    return (
        <aside className="w-full max-w-[250px] xl:max-w-[300px] h-screen hidden md:flex flex-col px-2 pr-4 py-5 overflow-y-scroll pb-16">
            <Birthdays />
            <Contacts />
        </aside>
    );
};
