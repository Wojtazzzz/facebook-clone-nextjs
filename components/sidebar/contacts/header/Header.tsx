import { SectionHeader } from '@components/sidebar/SectionHeader';
import { SearchContact } from './SearchContact';

export const Header = () => {
    return (
        <SectionHeader title="Contacts">
            <SearchContact />
        </SectionHeader>
    );
};
