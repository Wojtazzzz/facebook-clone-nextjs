import { screen } from '@testing-library/react';
import nock from 'nock';
import RootUserJson from '@mocks/user/root.json';
import InvitesFirstPageJson from '@mocks/friendsList/invites/firstPage.json';
import InvitesSecondPageJson from '@mocks/friendsList/invites/secondPage.json';
import InvitesEmptyPageJson from '@mocks/friendsList/invites/empty.json';
import { List } from '@components/pages/friends/List';
import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { mock } from '@libs/nock';

describe('Invites list', () => {
    beforeEach(() => {
        nock.disableNetConnect();
    });

    it('fetch button dissapears when page fetched all invites', async () => {
        mock('/api/friendship/invites?page=1', 200, InvitesFirstPageJson);

        renderWithDefaultData(<List userId={RootUserJson.id} type="invites" />);

        mock('/api/friendship/invites?page=1', 200, InvitesFirstPageJson);
        mock('/api/friendship/invites?page=2', 200, InvitesEmptyPageJson);

        const fetchMoreButton = await screen.findByTitle('Fetch more users');
        fetchMoreButton.click();

        expect(fetchMoreButton).not.toBeInTheDocument();
    });

    it('shows loaders on initial fetching invites', async () => {
        mock('/api/friendship/invites?page=1', 200, InvitesFirstPageJson);

        renderWithDefaultData(<List userId={RootUserJson.id} type="invites" />);

        const loader = await screen.findByTestId('friendsList-loading_more_loader');
        expect(loader).toBeInTheDocument();
    });

    it('loads 10 invites', async () => {
        mock('/api/friendship/invites?page=1', 200, InvitesFirstPageJson);

        renderWithDefaultData(<List userId={RootUserJson.id} type="invites" />);

        const firstElement = await screen.findByText(InvitesFirstPageJson[0].name);
        expect(firstElement).toBeInTheDocument();

        const tenthElement = await screen.findByText(InvitesFirstPageJson[9].name);
        expect(tenthElement).toBeInTheDocument();
    });

    it('shows loaders on fetching more invites', async () => {
        mock('/api/friendship/invites?page=1', 200, InvitesFirstPageJson);

        renderWithDefaultData(<List userId={RootUserJson.id} type="invites" />);

        mock('/api/friendship/invites?page=1', 200, InvitesFirstPageJson);
        mock('/api/friendship/invites?page=2', 200, InvitesSecondPageJson);

        const fetchMoreButton = await screen.findByTitle('Fetch more users');
        fetchMoreButton.click();

        const loader = screen.getByTestId('friendsList-fetching_more_loader');
        expect(loader).toBeInTheDocument();
    });

    it('can fetch more invites', async () => {
        mock('/api/friendship/invites?page=1', 200, InvitesFirstPageJson);

        renderWithDefaultData(<List userId={RootUserJson.id} type="invites" />);

        mock('/api/friendship/invites?page=1', 200, InvitesFirstPageJson);
        mock('/api/friendship/invites?page=2', 200, InvitesSecondPageJson);

        const fetchMoreButton = await screen.findByTitle('Fetch more users');
        fetchMoreButton.click();

        const firstElement = await screen.findByText(InvitesFirstPageJson[0].name);
        expect(firstElement).toBeInTheDocument();

        const tenthElement = await screen.findByText(InvitesFirstPageJson[9].name);
        expect(tenthElement).toBeInTheDocument();

        const eleventhElement = await screen.findByText(InvitesSecondPageJson[0].name);
        expect(eleventhElement).toBeInTheDocument();

        const twentythElement = await screen.findByText(InvitesSecondPageJson[9].name);
        expect(twentythElement).toBeInTheDocument();
    });

    it('shows empty component when fetch no invites', async () => {
        mock('/api/friendship/invites?page=1', 200, InvitesEmptyPageJson);

        renderWithDefaultData(<List userId={RootUserJson.id} type="invites" />);

        const emptyComponent = await screen.findByText('No users, maybe this app is so boring...');
        expect(emptyComponent).toBeInTheDocument();
    });

    it('shows error component when api returns error', async () => {
        mock('/api/friendship/invites?page=1', 500);

        renderWithDefaultData(<List userId={RootUserJson.id} type="invites" />);

        const errorImage = await screen.findByAltText('Server error');
        expect(errorImage).toBeInTheDocument();

        const errorComponent = await screen.findByText('Something went wrong');
        expect(errorComponent).toBeInTheDocument();
    });
});
