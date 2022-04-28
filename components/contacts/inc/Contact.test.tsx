import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { Contact } from '@components/contacts/inc/Contact';
import ContactsFirstPageJson from '@mocks/contacts/firstPage.json';
import { screen } from '@testing-library/react';

describe('Contact component from Contacts List', () => {
    it('it renders avatar and name', () => {
        const user = ContactsFirstPageJson[4];

        renderWithDefaultData(<Contact {...user} />);

        const avatar = screen.getByAltText(user.name);
        const name = screen.getByText(user.name);

        expect(avatar).toBeInTheDocument();
        expect(name).toBeInTheDocument();
    });
});
