import { Birthdays } from './birthdays/Birthdays';
import { Contacts } from './contacts/Contacts';

export const Sidebar = () => {
    return (
        <aside
            id="sidebar"
            className="w-full max-w-[220px] xl:max-w-[300px] h-screen bg-dark-300 overflow-y-auto scrollbar-thin scrollbar-thumb-dark-200 hidden fixed top-0 right-0 lg:flex flex-col mt-14 px-2 pr-4 py-5 pb-16"
        >
            <Birthdays />
            <Contacts />
        </aside>
    );
};
