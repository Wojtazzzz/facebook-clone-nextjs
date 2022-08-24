import { screen } from '@testing-library/react';
import RootUserJson from '@mocks/user/root.json';
import ContactsFirstPageJson from '@mocks/contacts/firstPage.json';
import ContactsEmptyPageJson from '@mocks/contacts/empty.json';
import { List } from '@components/contacts/list/List';
import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import { mock } from '@libs/nock';

describe('Contacts list component', () => {
    const contacts = ContactsFirstPageJson.data;

    beforeEach(() => {
        mock({
            path: '/api/user',
            data: RootUserJson,
        });
    });

    it('loads and render 15 contacts', async () => {
        mock({
            path: '/api/contacts?page=1',
            data: ContactsFirstPageJson,
        });

        renderWithDefaultData(<List />);

        const firstContact = await screen.findByText(contacts[0].name);
        expect(firstContact).toBeInTheDocument();

        const tenthContact = await screen.findByText(contacts[14].name);
        expect(tenthContact).toBeInTheDocument();
    });

    it('render loaders when first page is loading', () => {
        mock({
            path: '/api/contacts?page=1',
            data: ContactsFirstPageJson,
        });

        renderWithDefaultData(<List />);

        const loader = screen.getByTestId('contacts-loading_loader');
        expect(loader).toBeInTheDocument();
    });

    it('render empty component when response return empty data', async () => {
        mock({
            path: '/api/contacts?page=1',
            data: ContactsEmptyPageJson,
        });

        renderWithDefaultData(<List />);

        const emptyComponent = await screen.findByText('No contacts, add some friends!');
        expect(emptyComponent).toBeInTheDocument();
    });

    it('render error component when api return server error', async () => {
        mock({
            path: '/api/contacts?page=1',
            status: 500,
        });

        renderWithDefaultData(<List />);

        const errorComponent = await screen.findByText('Something went wrong');
        expect(errorComponent).toBeInTheDocument();

        const errorImage = await screen.findByAltText('Server error');
        expect(errorImage).toBeInTheDocument();
    });
});
