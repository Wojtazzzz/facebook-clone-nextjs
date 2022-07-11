import { SearchContact } from '@components/contacts/inc/SearchContact';

export const Header = () => {
    return (
        <div className="w-full flex justify-between items-center text-light-100 border-b-2 border-dark-200 pb-1 mb-3">
            <span className="text-lg font-medium">Contacts</span>
            <SearchContact />
        </div>
    );
};
