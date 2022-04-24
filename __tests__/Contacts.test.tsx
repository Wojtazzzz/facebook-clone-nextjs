import { screen } from '@testing-library/react';
import RootUserJson from '@mocks/user/root.json';
import ContactsFirstPageJson from '@mocks/contacts/firstPage.json';
import ContactsSecondPageJson from '@mocks/contacts/secondPage.json';
import ContactsEmptyPageJson from '@mocks/contacts/empty.json';
import nock from 'nock';
import { Contacts } from '@components/contacts/Contacts';
import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { mock } from '@libs/nock';

describe('Contacts component', () => {
    beforeEach(() => {
        nock.disableNetConnect();

        mock('/api/user', 200, RootUserJson);
    });

    it('renders section title', () => {
        renderWithDefaultData(<Contacts />);

        const title = screen.getByText('Contacts');

        expect(title).toBeInTheDocument();
    });

    it('loads first contacts list', async () => {
        mock(`/api/friendship/friends/${RootUserJson.id}?page=1`, 200, ContactsFirstPageJson);

        renderWithDefaultData(<Contacts />);

        const firstContact = await screen.findByText(ContactsFirstPageJson[0].name);
        expect(firstContact).toBeInTheDocument();

        const tenthContact = await screen.findByText(ContactsFirstPageJson[9].name);
        expect(tenthContact).toBeInTheDocument();
    });

    it('loads empty list and show empty component', async () => {
        mock(`/api/friendship/friends/${RootUserJson.id}?page=1`, 200, ContactsEmptyPageJson);

        renderWithDefaultData(<Contacts />);

        const emptyComponent = await screen.findByText('No contacts, add some friends!');
        expect(emptyComponent).toBeInTheDocument();
    });

    it('show error component on api error', async () => {
        mock(`/api/friendship/friends/${RootUserJson.id}?page=1`, 500);

        renderWithDefaultData(<Contacts />);

        const errorComponent = await screen.findByText('Something went wrong');
        expect(errorComponent).toBeInTheDocument();

        const errorImage = await screen.findByAltText('Server error');
        expect(errorImage).toBeInTheDocument();
    });

    it('loads more contacts on click on load more button', async () => {
        mock(`/api/friendship/friends/${RootUserJson.id}?page=1`, 200, ContactsFirstPageJson);

        renderWithDefaultData(<Contacts />);

        const firstContact = await screen.findByText(ContactsFirstPageJson[0].name);
        expect(firstContact).toBeInTheDocument();

        const tenthContact = await screen.findByText(ContactsFirstPageJson[9].name);
        expect(tenthContact).toBeInTheDocument();

        mock(`/api/friendship/friends/${RootUserJson.id}?page=1`, 200, ContactsFirstPageJson);
        mock(`/api/friendship/friends/${RootUserJson.id}?page=2`, 200, ContactsSecondPageJson);

        const loadMoreButton = await screen.findByTitle('Load more contacts');
        loadMoreButton.click();

        const eleventhContact = await screen.findByText(ContactsSecondPageJson[0].name);
        expect(eleventhContact).toBeInTheDocument();

        const twentythContact = await screen.findByText(ContactsSecondPageJson[9].name);
        expect(twentythContact).toBeInTheDocument();
    });

    it('fetch button dissapears when page fetch all contacts', async () => {
        mock(`/api/friendship/friends/${RootUserJson.id}?page=1`, 200, ContactsFirstPageJson);

        renderWithDefaultData(<Contacts />);

        mock(`/api/friendship/friends/${RootUserJson.id}?page=1`, 200, ContactsFirstPageJson);
        mock(`/api/friendship/friends/${RootUserJson.id}?page=2`, 200, ContactsEmptyPageJson);

        const loadMoreButton = await screen.findByTitle('Load more contacts');
        loadMoreButton.click();

        expect(loadMoreButton).not.toBeInTheDocument();
    });
});
