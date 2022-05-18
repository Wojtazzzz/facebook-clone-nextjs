import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { Contact } from '@components/contacts/inc/Contact';
import ContactsFirstPageJson from '@mocks/contacts/firstPage.json';
import { screen } from '@testing-library/react';

describe('Contact component from Contacts List', () => {
    it('it renders name properly', () => {
        const user = ContactsFirstPageJson[4];

        renderWithDefaultData(<Contact friend={user} />);

        const name = screen.getByText(user.name);

        expect(name).toBeInTheDocument();
    });
});
