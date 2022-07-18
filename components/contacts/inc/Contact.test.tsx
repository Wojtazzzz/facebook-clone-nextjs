import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { Contact } from '@components/contacts/inc/Contact';
import ContactsFirstPageJson from '@mocks/contacts/firstPage.json';
import { screen } from '@testing-library/react';

describe('Contact component from Contacts List', () => {
    it('it renders name properly', () => {
        const contact = ContactsFirstPageJson[4];

        renderWithDefaultData(<Contact {...contact} />);

        const name = screen.getByText(contact.name);

        expect(name).toBeInTheDocument();
    });
});
