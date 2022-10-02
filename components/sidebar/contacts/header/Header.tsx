import { SectionHeader } from '@components/sidebar/SectionHeader';
import { SearchContact } from './SearchContact';

interface HeaderProps {
    headingId: string;
}

export const Header = ({ headingId }: HeaderProps) => {
    return (
        <SectionHeader headingId={headingId} title="Contacts">
            <SearchContact />
        </SectionHeader>
    );
};
