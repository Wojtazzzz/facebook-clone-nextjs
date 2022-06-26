import { screen } from '@testing-library/react';
import RootUserJson from '@mocks/user/root.json';
import ContactsFirstPageJson from '@mocks/contacts/firstPage.json';
import ContactsSecondPageJson from '@mocks/contacts/secondPage.json';
import ContactsEmptyPageJson from '@mocks/contacts/empty.json';
import nock from 'nock';
import { List } from '@components/contacts/List';
import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { mock } from '@libs/nock';
import userEvent from '@testing-library/user-event';

describe('Contacts List component', () => {
    const user = userEvent.setup();

    beforeEach(() => {
        nock.disableNetConnect();
        mock('/api/user', 200, RootUserJson);
    });

    it('loads first contacts list', async () => {
        mock(`/api/friendship/friends/${RootUserJson.id}?page=1`, 200, ContactsFirstPageJson);

        renderWithDefaultData(<List userId={RootUserJson.id} />);

        const firstContact = await screen.findByText(ContactsFirstPageJson[0].name);
        expect(firstContact).toBeInTheDocument();

        const tenthContact = await screen.findByText(ContactsFirstPageJson[9].name);
        expect(tenthContact).toBeInTheDocument();
    });

    it('show loaders when first list is loading', () => {
        mock(`/api/friendship/friends/${RootUserJson.id}?page=1`, 200, ContactsFirstPageJson);

        renderWithDefaultData(<List userId={RootUserJson.id} />);

        const loader = screen.getByTestId('contacts-loading_loader');
        expect(loader).toBeInTheDocument();
    });

    it('loads empty list and show empty component', async () => {
        mock(`/api/friendship/friends/${RootUserJson.id}?page=1`, 200, ContactsEmptyPageJson);

        renderWithDefaultData(<List userId={RootUserJson.id} />);

        const emptyComponent = await screen.findByText('No contacts, add some friends!');
        expect(emptyComponent).toBeInTheDocument();
    });

    it('show error component on api error', async () => {
        mock(`/api/friendship/friends/${RootUserJson.id}?page=1`, 500);

        renderWithDefaultData(<List userId={RootUserJson.id} />);

        const errorComponent = await screen.findByText('Something went wrong');
        expect(errorComponent).toBeInTheDocument();

        const errorImage = await screen.findByAltText('Server error');
        expect(errorImage).toBeInTheDocument();
    });

    it('loads more contacts on click on load more button', async () => {
        mock(`/api/friendship/friends/${RootUserJson.id}?page=1`, 200, ContactsFirstPageJson);

        renderWithDefaultData(<List userId={RootUserJson.id} />);

        const firstContact = await screen.findByText(ContactsFirstPageJson[0].name);
        expect(firstContact).toBeInTheDocument();

        const tenthContact = await screen.findByText(ContactsFirstPageJson[9].name);
        expect(tenthContact).toBeInTheDocument();

        mock(`/api/friendship/friends/${RootUserJson.id}?page=1`, 200, ContactsFirstPageJson);
        mock(`/api/friendship/friends/${RootUserJson.id}?page=2`, 200, ContactsSecondPageJson);

        const loadMoreButton = await screen.findByTitle('Load more contacts');
        await user.click(loadMoreButton);

        const eleventhContact = await screen.findByText(ContactsSecondPageJson[0].name);
        expect(eleventhContact).toBeInTheDocument();

        const twentythContact = await screen.findByText(ContactsSecondPageJson[9].name);
        expect(twentythContact).toBeInTheDocument();
    });

    it('fetch button dissapears when page fetch all contacts', async () => {
        mock(`/api/friendship/friends/${RootUserJson.id}?page=1`, 200, ContactsFirstPageJson);

        renderWithDefaultData(<List userId={RootUserJson.id} />);

        mock(`/api/friendship/friends/${RootUserJson.id}?page=1`, 200, ContactsFirstPageJson);
        mock(`/api/friendship/friends/${RootUserJson.id}?page=2`, 200, ContactsEmptyPageJson);

        const loadMoreButton = await screen.findByTitle('Load more contacts');
        await user.click(loadMoreButton);

        expect(loadMoreButton).not.toBeInTheDocument();
    });
});
