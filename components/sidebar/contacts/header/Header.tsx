import { SectionHeader } from '@components/sidebar/SectionHeader';

interface HeaderProps {
    headingId: string;
}

export const Header = ({ headingId }: HeaderProps) => {
    return <SectionHeader headingId={headingId} title="Contacts" />;
};
