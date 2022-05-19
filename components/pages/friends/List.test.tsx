import { screen } from '@testing-library/react';
import { List } from '@components/pages/friends/List';
import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { mock } from '@libs/nock';
import RootUserJson from '@mocks/user/root.json';
import SuggestsFirstPageJson from '@mocks/friendsList/suggests/firstPage.json';
import SuggestsSecondPageJson from '@mocks/friendsList/suggests/secondPage.json';
import SuggestsEmptyPageJson from '@mocks/friendsList/suggests/empty.json';
import PokesFirstPageJson from '@mocks/friendsList/pokes/firstPage.json';
import PokesSecondPageJson from '@mocks/friendsList/pokes/secondPage.json';
import PokesEmptyPageJson from '@mocks/friendsList/pokes/empty.json';
import InvitesFirstPageJson from '@mocks/friendsList/invites/firstPage.json';
import InvitesSecondPageJson from '@mocks/friendsList/invites/secondPage.json';
import InvitesEmptyPageJson from '@mocks/friendsList/invites/empty.json';
import FriendsFirstPageJson from '@mocks/friendsList/friends/firstPage.json';
import FriendsSecondPageJson from '@mocks/friendsList/friends/secondPage.json';
import FriendsEmptyPageJson from '@mocks/friendsList/friends/empty.json';

describe('Friends List component', () => {
    describe('Suggests list', () => {
        it('fetch button dissapears when page fetched all suggests', async () => {
            mock('/api/friendship/suggests?page=1', 200, SuggestsFirstPageJson);

            renderWithDefaultData(<List userId={RootUserJson.id} listType="SUGGESTS" />);

            mock('/api/friendship/suggests?page=1', 200, SuggestsFirstPageJson);
            mock('/api/friendship/suggests?page=2', 200, SuggestsEmptyPageJson);

            const fetchMoreButton = await screen.findByTitle('Fetch more users');
            fetchMoreButton.click();

            expect(fetchMoreButton).not.toBeInTheDocument();
        });

        it('shows loaders on initial fetching suggested users', async () => {
            mock('/api/friendship/suggests?page=1', 200, SuggestsFirstPageJson);

            renderWithDefaultData(<List userId={RootUserJson.id} listType="SUGGESTS" />);

            const loader = await screen.findByTestId('friendsList-loading_loader');
            expect(loader).toBeInTheDocument();
        });

        it('loads 10 suggested users', async () => {
            mock('/api/friendship/suggests?page=1', 200, SuggestsFirstPageJson);

            renderWithDefaultData(<List userId={RootUserJson.id} listType="SUGGESTS" />);

            const firstElement = await screen.findByText(SuggestsFirstPageJson[0].name);
            expect(firstElement).toBeInTheDocument();

            const tenthElement = await screen.findByText(SuggestsFirstPageJson[9].name);
            expect(tenthElement).toBeInTheDocument();
        });

        it('shows loaders on fetching more suggested users', async () => {
            mock('/api/friendship/suggests?page=1', 200, SuggestsFirstPageJson);

            renderWithDefaultData(<List userId={RootUserJson.id} listType="SUGGESTS" />);

            mock('/api/friendship/suggests?page=1', 200, SuggestsFirstPageJson);
            mock('/api/friendship/suggests?page=2', 200, SuggestsSecondPageJson);

            const fetchMoreButton = await screen.findByTitle('Fetch more users');
            fetchMoreButton.click();

            const loader = screen.getByTestId('friendsList-fetching_loader');
            expect(loader).toBeInTheDocument();
        });

        it('can fetch more suggested users', async () => {
            mock('/api/friendship/suggests?page=1', 200, SuggestsFirstPageJson);

            renderWithDefaultData(<List userId={RootUserJson.id} listType="SUGGESTS" />);

            mock('/api/friendship/suggests?page=1', 200, SuggestsFirstPageJson);
            mock('/api/friendship/suggests?page=2', 200, SuggestsSecondPageJson);

            const fetchMoreButton = await screen.findByTitle('Fetch more users');
            fetchMoreButton.click();

            const firstElement = await screen.findByText(SuggestsFirstPageJson[0].name);
            expect(firstElement).toBeInTheDocument();

            const tenthElement = await screen.findByText(SuggestsFirstPageJson[9].name);
            expect(tenthElement).toBeInTheDocument();

            const eleventhElement = await screen.findByText(SuggestsSecondPageJson[0].name);
            expect(eleventhElement).toBeInTheDocument();

            const twentythElement = await screen.findByText(SuggestsSecondPageJson[9].name);
            expect(twentythElement).toBeInTheDocument();
        });

        it('shows empty component when fetch no suggested users', async () => {
            mock('/api/friendship/suggests?page=1', 200, SuggestsEmptyPageJson);

            renderWithDefaultData(<List userId={RootUserJson.id} listType="SUGGESTS" />);

            const emptyComponent = await screen.findByText('No users, maybe this app is so boring...');
            expect(emptyComponent).toBeInTheDocument();
        });

        it('shows error component when api returns error', async () => {
            mock('/api/friendship/suggests?page=1', 500);

            renderWithDefaultData(<List userId={RootUserJson.id} listType="SUGGESTS" />);

            const errorImage = await screen.findByAltText('Server error');
            expect(errorImage).toBeInTheDocument();

            const emptyComponent = await screen.findByText('Something went wrong');
            expect(emptyComponent).toBeInTheDocument();
        });
    });

    describe('Pokes list', () => {
        it('fetch button dissapears when page fetched all pokes', async () => {
            mock('/api/pokes?page=1', 200, PokesFirstPageJson);

            renderWithDefaultData(<List userId={RootUserJson.id} listType="POKES" />);

            mock('/api/pokes?page=1', 200, PokesFirstPageJson);
            mock('/api/pokes?page=2', 200, PokesEmptyPageJson);

            const fetchMoreButton = await screen.findByTitle('Fetch more users');
            fetchMoreButton.click();

            expect(fetchMoreButton).not.toBeInTheDocument();
        });

        it('shows loaders on initial fetching pokes', async () => {
            mock('/api/pokes?page=1', 200, PokesFirstPageJson);

            renderWithDefaultData(<List userId={RootUserJson.id} listType="POKES" />);

            const loader = await screen.findByTestId('friendsList-loading_loader');
            expect(loader).toBeInTheDocument();
        });

        it('loads 10 pokes', async () => {
            mock('/api/pokes?page=1', 200, PokesFirstPageJson);

            renderWithDefaultData(<List userId={RootUserJson.id} listType="POKES" />);

            const firstElement = await screen.findByText(PokesFirstPageJson[0].name);
            expect(firstElement).toBeInTheDocument();

            const tenthElement = await screen.findByText(PokesFirstPageJson[9].name);
            expect(tenthElement).toBeInTheDocument();
        });

        it('shows loaders on fetching more pokes', async () => {
            mock('/api/pokes?page=1', 200, PokesFirstPageJson);

            renderWithDefaultData(<List userId={RootUserJson.id} listType="POKES" />);

            mock('/api/pokes?page=1', 200, PokesFirstPageJson);
            mock('/api/pokes?page=2', 200, PokesSecondPageJson);

            const fetchMoreButton = await screen.findByTitle('Fetch more users');
            fetchMoreButton.click();

            const loader = screen.getByTestId('friendsList-fetching_loader');
            expect(loader).toBeInTheDocument();
        });

        it('can fetch more pokes', async () => {
            mock('/api/pokes?page=1', 200, PokesFirstPageJson);

            renderWithDefaultData(<List userId={RootUserJson.id} listType="POKES" />);

            mock('/api/pokes?page=1', 200, PokesFirstPageJson);
            mock('/api/pokes?page=2', 200, PokesSecondPageJson);

            const fetchMoreButton = await screen.findByTitle('Fetch more users');
            fetchMoreButton.click();

            const firstElement = await screen.findByText(PokesFirstPageJson[0].name);
            expect(firstElement).toBeInTheDocument();

            const tenthElement = await screen.findByText(PokesFirstPageJson[9].name);
            expect(tenthElement).toBeInTheDocument();

            const eleventhElement = await screen.findByText(PokesSecondPageJson[0].name);
            expect(eleventhElement).toBeInTheDocument();

            const twentythElement = await screen.findByText(PokesSecondPageJson[9].name);
            expect(twentythElement).toBeInTheDocument();
        });

        it('shows empty component when fetch no pokes', async () => {
            mock('/api/pokes?page=1', 200, PokesEmptyPageJson);

            renderWithDefaultData(<List userId={RootUserJson.id} listType="POKES" />);

            const emptyComponent = await screen.findByText('No users, maybe this app is so boring...');
            expect(emptyComponent).toBeInTheDocument();
        });

        it('shows error component when api returns error', async () => {
            mock('/api/pokes?page=1', 500, PokesFirstPageJson);

            renderWithDefaultData(<List userId={RootUserJson.id} listType="POKES" />);

            const errorImage = await screen.findByAltText('Server error');
            expect(errorImage).toBeInTheDocument();

            const emptyComponent = await screen.findByText('Something went wrong');
            expect(emptyComponent).toBeInTheDocument();
        });

        it('shows truthy pokes count', async () => {
            mock('/api/pokes?page=1', 200, PokesFirstPageJson);

            renderWithDefaultData(<List userId={RootUserJson.id} listType="POKES" />);

            for (let i = 0; i < PokesFirstPageJson.length; i++) {
                const element = await screen.findByText(
                    `${PokesFirstPageJson[i].first_name} poked you ${PokesFirstPageJson[i].poke_info.count} times in a row`
                );

                expect(element).toBeInTheDocument();
            }
        });
    });

    describe('Invites list', () => {
        it('fetch button dissapears when page fetched all invites', async () => {
            mock('/api/friendship/invites?page=1', 200, InvitesFirstPageJson);

            renderWithDefaultData(<List userId={RootUserJson.id} listType="INVITES" />);

            mock('/api/friendship/invites?page=1', 200, InvitesFirstPageJson);
            mock('/api/friendship/invites?page=2', 200, InvitesEmptyPageJson);

            const fetchMoreButton = await screen.findByTitle('Fetch more users');
            fetchMoreButton.click();

            expect(fetchMoreButton).not.toBeInTheDocument();
        });

        it('shows loaders on initial fetching invites', async () => {
            mock('/api/friendship/invites?page=1', 200, InvitesFirstPageJson);

            renderWithDefaultData(<List userId={RootUserJson.id} listType="INVITES" />);

            const loader = await screen.findByTestId('friendsList-loading_loader');
            expect(loader).toBeInTheDocument();
        });

        it('loads 10 invites', async () => {
            mock('/api/friendship/invites?page=1', 200, InvitesFirstPageJson);

            renderWithDefaultData(<List userId={RootUserJson.id} listType="INVITES" />);

            const firstElement = await screen.findByText(InvitesFirstPageJson[0].name);
            expect(firstElement).toBeInTheDocument();

            const tenthElement = await screen.findByText(InvitesFirstPageJson[9].name);
            expect(tenthElement).toBeInTheDocument();
        });

        it('shows loaders on fetching more invites', async () => {
            mock('/api/friendship/invites?page=1', 200, InvitesFirstPageJson);

            renderWithDefaultData(<List userId={RootUserJson.id} listType="INVITES" />);

            mock('/api/friendship/invites?page=1', 200, InvitesFirstPageJson);
            mock('/api/friendship/invites?page=2', 200, InvitesSecondPageJson);

            const fetchMoreButton = await screen.findByTitle('Fetch more users');
            fetchMoreButton.click();

            const loader = screen.getByTestId('friendsList-fetching_loader');
            expect(loader).toBeInTheDocument();
        });

        it('can fetch more invites', async () => {
            mock('/api/friendship/invites?page=1', 200, InvitesFirstPageJson);

            renderWithDefaultData(<List userId={RootUserJson.id} listType="INVITES" />);

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

            renderWithDefaultData(<List userId={RootUserJson.id} listType="INVITES" />);

            const emptyComponent = await screen.findByText('No users, maybe this app is so boring...');
            expect(emptyComponent).toBeInTheDocument();
        });

        it('shows error component when api returns error', async () => {
            mock('/api/friendship/invites?page=1', 500);

            renderWithDefaultData(<List userId={RootUserJson.id} listType="INVITES" />);

            const errorImage = await screen.findByAltText('Server error');
            expect(errorImage).toBeInTheDocument();

            const errorComponent = await screen.findByText('Something went wrong');
            expect(errorComponent).toBeInTheDocument();
        });
    });

    describe('Friends list', () => {
        it('fetch button dissapears when page fetched all friends', async () => {
            mock(`/api/friendship/friends/${RootUserJson.id}?page=1`, 200, FriendsFirstPageJson);

            renderWithDefaultData(<List userId={RootUserJson.id} listType="FRIENDS" />);

            mock(`/api/friendship/friends/${RootUserJson.id}?page=1`, 200, FriendsFirstPageJson);
            mock(`/api/friendship/friends/${RootUserJson.id}?page=2`, 200, FriendsEmptyPageJson);

            const fetchMoreButton = await screen.findByTitle('Fetch more users');
            fetchMoreButton.click();

            expect(fetchMoreButton).not.toBeInTheDocument();
        });

        it('shows loaders on initial fetching friends', async () => {
            mock(`/api/friendship/friends/${RootUserJson.id}?page=1`, 200, FriendsFirstPageJson);

            renderWithDefaultData(<List userId={RootUserJson.id} listType="FRIENDS" />);

            const loader = await screen.findByTestId('friendsList-loading_loader');
            expect(loader).toBeInTheDocument();
        });

        it('loads 10 friends', async () => {
            mock(`/api/friendship/friends/${RootUserJson.id}?page=1`, 200, FriendsFirstPageJson);

            renderWithDefaultData(<List userId={RootUserJson.id} listType="FRIENDS" />);

            const firstElement = await screen.findByText(FriendsFirstPageJson[0].name);
            expect(firstElement).toBeInTheDocument();

            const tenthElement = await screen.findByText(FriendsFirstPageJson[9].name);
            expect(tenthElement).toBeInTheDocument();
        });

        it('shows loaders on fetching more friends', async () => {
            mock(`/api/friendship/friends/${RootUserJson.id}?page=1`, 200, FriendsFirstPageJson);

            renderWithDefaultData(<List userId={RootUserJson.id} listType="FRIENDS" />);

            mock(`/api/friendship/friends/${RootUserJson.id}?page=1`, 200, FriendsFirstPageJson);
            mock(`/api/friendship/friends/${RootUserJson.id}?page=2`, 200, FriendsSecondPageJson);

            const fetchMoreButton = await screen.findByTitle('Fetch more users');
            fetchMoreButton.click();

            const loader = screen.getByTestId('friendsList-fetching_loader');
            expect(loader).toBeInTheDocument();
        });

        it('can fetch more friends', async () => {
            mock(`/api/friendship/friends/${RootUserJson.id}?page=1`, 200, FriendsFirstPageJson);

            renderWithDefaultData(<List userId={RootUserJson.id} listType="FRIENDS" />);

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

            renderWithDefaultData(<List userId={RootUserJson.id} listType="FRIENDS" />);

            const emptyComponent = await screen.findByText('No users, maybe this app is so boring...');
            expect(emptyComponent).toBeInTheDocument();
        });

        it('shows error component when api returns error', async () => {
            mock(`/api/friendship/friends/${RootUserJson.id}?page=1`, 500);

            renderWithDefaultData(<List userId={RootUserJson.id} listType="FRIENDS" />);

            const errorImage = await screen.findByAltText('Server error');
            expect(errorImage).toBeInTheDocument();

            const emptyComponent = await screen.findByText('Something went wrong');
            expect(emptyComponent).toBeInTheDocument();
        });
    });
});
