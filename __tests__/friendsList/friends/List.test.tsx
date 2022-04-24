import { screen } from '@testing-library/react';
import nock from 'nock';
import RootUserJson from '@mocks/user/root.json';
import FriendsFirstPageJson from '@mocks/friendsList/friends/firstPage.json';
import FriendsSecondPageJson from '@mocks/friendsList/friends/secondPage.json';
import FriendsEmptyPageJson from '@mocks/friendsList/friends/empty.json';
import { List } from '@components/pages/friends/List';
import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { mock } from '@libs/nock';

describe('Friends list', () => {
    beforeEach(() => {
        nock.disableNetConnect();
    });

    it('fetch button dissapears when page fetched all friends', async () => {
        mock(`/api/friendship/friends/${RootUserJson.id}?page=1`, 200, FriendsFirstPageJson);

        renderWithDefaultData(<List userId={RootUserJson.id} type="friends" />);

        mock(`/api/friendship/friends/${RootUserJson.id}?page=1`, 200, FriendsFirstPageJson);
        mock(`/api/friendship/friends/${RootUserJson.id}?page=2`, 200, FriendsEmptyPageJson);

        const fetchMoreButton = await screen.findByTitle('Fetch more users');
        fetchMoreButton.click();

        expect(fetchMoreButton).not.toBeInTheDocument();
    });

    it('shows loaders on initial fetching friends', async () => {
        mock(`/api/friendship/friends/${RootUserJson.id}?page=1`, 200, FriendsFirstPageJson);

        renderWithDefaultData(<List userId={RootUserJson.id} type="friends" />);

        const loader = await screen.findByTestId('friendsList-loading_more_loader');
        expect(loader).toBeInTheDocument();
    });

    it('loads 10 friends', async () => {
        mock(`/api/friendship/friends/${RootUserJson.id}?page=1`, 200, FriendsFirstPageJson);

        renderWithDefaultData(<List userId={RootUserJson.id} type="friends" />);

        const firstElement = await screen.findByText(FriendsFirstPageJson[0].name);
        expect(firstElement).toBeInTheDocument();

        const tenthElement = await screen.findByText(FriendsFirstPageJson[9].name);
        expect(tenthElement).toBeInTheDocument();
    });

    it('shows loaders on fetching more friends', async () => {
        mock(`/api/friendship/friends/${RootUserJson.id}?page=1`, 200, FriendsFirstPageJson);

        renderWithDefaultData(<List userId={RootUserJson.id} type="friends" />);

        mock(`/api/friendship/friends/${RootUserJson.id}?page=1`, 200, FriendsFirstPageJson);
        mock(`/api/friendship/friends/${RootUserJson.id}?page=2`, 200, FriendsSecondPageJson);

        const fetchMoreButton = await screen.findByTitle('Fetch more users');
        fetchMoreButton.click();

        const loader = screen.getByTestId('friendsList-fetching_more_loader');
        expect(loader).toBeInTheDocument();
    });

    it('can fetch more friends', async () => {
        mock(`/api/friendship/friends/${RootUserJson.id}?page=1`, 200, FriendsFirstPageJson);

        renderWithDefaultData(<List userId={RootUserJson.id} type="friends" />);

        mock(`/api/friendship/friends/${RootUserJson.id}?page=1`, 200, FriendsFirstPageJson);
        mock(`/api/friendship/friends/${RootUserJson.id}?page=2`, 200, FriendsSecondPageJson);

        const fetchMoreButton = await screen.findByTitle('Fetch more users');
        fetchMoreButton.click();

        const firstElement = await screen.findByText(FriendsFirstPageJson[0].name);
        expect(firstElement).toBeInTheDocument();

        const tenthElement = await screen.findByText(FriendsFirstPageJson[9].name);
        expect(tenthElement).toBeInTheDocument();

        const eleventhElement = await screen.findByText(FriendsSecondPageJson[0].name);
        expect(eleventhElement).toBeInTheDocument();

        const twentythElement = await screen.findByText(FriendsSecondPageJson[9].name);
        expect(twentythElement).toBeInTheDocument();
    });

    it('shows empty component when fetch no friends', async () => {
        mock(`/api/friendship/friends/${RootUserJson.id}?page=1`, 200, FriendsEmptyPageJson);

        renderWithDefaultData(<List userId={RootUserJson.id} type="friends" />);

        const emptyComponent = await screen.findByText('No users, maybe this app is so boring...');
        expect(emptyComponent).toBeInTheDocument();
    });

    it('shows error component when api returns error', async () => {
        mock(`/api/friendship/friends/${RootUserJson.id}?page=1`, 500);

        renderWithDefaultData(<List userId={RootUserJson.id} type="friends" />);

        const errorImage = await screen.findByAltText('Server error');
        expect(errorImage).toBeInTheDocument();

        const emptyComponent = await screen.findByText('Something went wrong');
        expect(emptyComponent).toBeInTheDocument();
    });
});
