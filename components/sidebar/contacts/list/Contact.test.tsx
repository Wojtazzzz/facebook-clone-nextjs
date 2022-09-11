import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import ContactsFirstPageJson from '@mocks/contacts/firstPage.json';
import { screen } from '@testing-library/react';
import { Contact } from './Contact';

describe('Contact component', () => {
    it('render user name properly', () => {
        const contact = ContactsFirstPageJson.data[4];

        renderWithDefaultData(<Contact {...contact} />);

        const name = screen.getByText(contact.name);

        expect(name).toBeInTheDocument();
    });
});
