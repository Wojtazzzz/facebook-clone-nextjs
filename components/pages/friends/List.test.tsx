import { screen } from '@testing-library/react';
import { List } from '@components/pages/friends/List';
import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { mock } from '@libs/nock';
import SuggestsFirstPageJson from '@mocks/friendsList/suggests/firstPage.json';
import SuggestsSecondPageJson from '@mocks/friendsList/suggests/secondPage.json';
import PokesFirstPageJson from '@mocks/friendsList/pokes/firstPage.json';
import PokesSecondPageJson from '@mocks/friendsList/pokes/secondPage.json';
import InvitesFirstPageJson from '@mocks/friendsList/invites/firstPage.json';
import InvitesSecondPageJson from '@mocks/friendsList/invites/secondPage.json';
import FriendsFirstPageJson from '@mocks/friendsList/friends/firstPage.json';
import FriendsSecondPageJson from '@mocks/friendsList/friends/secondPage.json';
import userEvent from '@testing-library/user-event';

describe('Friends List component', () => {
    const user = userEvent.setup();

    describe('Suggests list', () => {
        it('fetch button dissapears when page fetched all suggests', async () => {
            mock('/api/friends/suggests?page=1', 200, SuggestsFirstPageJson);

            renderWithDefaultData(<List type="Suggests" />);

            mock('/api/friends/suggests?page=1', 200, SuggestsFirstPageJson);
            mock('/api/friends/suggests?page=2', 200, []);

            const fetchMoreButton = await screen.findByTitle('Fetch more users');
            await user.click(fetchMoreButton);

            expect(fetchMoreButton).not.toBeInTheDocument();
        });

        it('shows loaders on initial fetching suggested users', async () => {
            mock('/api/friends/suggests?page=1', 200, SuggestsFirstPageJson);

            renderWithDefaultData(<List type="Suggests" />);

            const loader = await screen.findByTestId('friendsList-loading_loader');
            expect(loader).toBeInTheDocument();
        });

        it('loads 10 suggested users', async () => {
            mock('/api/friends/suggests?page=1', 200, SuggestsFirstPageJson);

            renderWithDefaultData(<List type="Suggests" />);

            const firstElement = await screen.findByText(SuggestsFirstPageJson[0].friend.name);
            expect(firstElement).toBeInTheDocument();

            const tenthElement = await screen.findByText(SuggestsFirstPageJson[9].friend.name);
            expect(tenthElement).toBeInTheDocument();
        });

        it('shows loaders on fetching more suggested users', async () => {
            mock('/api/friends/suggests?page=1', 200, SuggestsFirstPageJson);

            renderWithDefaultData(<List type="Suggests" />);

            mock('/api/friends/suggests?page=1', 200, SuggestsFirstPageJson);
            mock('/api/friends/suggests?page=2', 200, SuggestsSecondPageJson);

            const fetchMoreButton = await screen.findByTitle('Fetch more users');
            await user.click(fetchMoreButton);

            const loader = screen.getByTestId('friendsList-fetching_loader');
            expect(loader).toBeInTheDocument();
        });

        it('can fetch more suggests users', async () => {
            mock('/api/friends/suggests?page=1', 200, SuggestsFirstPageJson);

            renderWithDefaultData(<List type="Suggests" />);

            mock('/api/friends/suggests?page=1', 200, SuggestsFirstPageJson);
            mock('/api/friends/suggests?page=2', 200, SuggestsSecondPageJson);

            const fetchMoreButton = await screen.findByTitle('Fetch more users');
            await user.click(fetchMoreButton);

            const firstElement = await screen.findByText(SuggestsFirstPageJson[0].friend.name);
            expect(firstElement).toBeInTheDocument();

            const tenthElement = await screen.findByText(SuggestsFirstPageJson[9].friend.name);
            expect(tenthElement).toBeInTheDocument();

            const eleventhElement = await screen.findByText(SuggestsSecondPageJson[0].friend.name);
            expect(eleventhElement).toBeInTheDocument();

            const twentythElement = await screen.findByText(SuggestsSecondPageJson[9].friend.name);
            expect(twentythElement).toBeInTheDocument();
        });

        it('shows empty component when fetch no suggested users', async () => {
            mock('/api/friends/suggests?page=1', 200, []);

            renderWithDefaultData(<List type="Suggests" />);

            const emptyComponent = await screen.findByText('No users, maybe this app is so boring...');
            expect(emptyComponent).toBeInTheDocument();
        });

        it('shows error component when api returns error', async () => {
            mock('/api/friends/suggests?page=1', 500);

            renderWithDefaultData(<List type="Suggests" />);

            const errorImage = await screen.findByAltText('Server error');
            expect(errorImage).toBeInTheDocument();

            const emptyComponent = await screen.findByText('Something went wrong');
            expect(emptyComponent).toBeInTheDocument();
        });
    });

    describe('Pokes list', () => {
        it('fetch button dissapears when page fetched all pokes', async () => {
            mock('/api/pokes?page=1', 200, PokesFirstPageJson);

            renderWithDefaultData(<List type="Pokes" />);

            mock('/api/pokes?page=1', 200, PokesFirstPageJson);
            mock('/api/pokes?page=2', 200, []);

            const fetchMoreButton = await screen.findByTitle('Fetch more users');
            await user.click(fetchMoreButton);

            expect(fetchMoreButton).not.toBeInTheDocument();
        });

        it('shows loaders on initial fetching pokes', async () => {
            mock('/api/pokes?page=1', 200, PokesFirstPageJson);

            renderWithDefaultData(<List type="Pokes" />);

            const loader = await screen.findByTestId('friendsList-loading_loader');
            expect(loader).toBeInTheDocument();
        });

        it('loads 10 pokes', async () => {
            mock('/api/pokes?page=1', 200, PokesFirstPageJson);

            renderWithDefaultData(<List type="Pokes" />);

            const firstElement = await screen.findByText(PokesFirstPageJson[0].friend.name);
            expect(firstElement).toBeInTheDocument();

            const tenthElement = await screen.findByText(PokesFirstPageJson[9].friend.name);
            expect(tenthElement).toBeInTheDocument();
        });

        it('shows loaders on fetching more pokes', async () => {
            mock('/api/pokes?page=1', 200, PokesFirstPageJson);

            renderWithDefaultData(<List type="Pokes" />);

            mock('/api/pokes?page=1', 200, PokesFirstPageJson);
            mock('/api/pokes?page=2', 200, PokesSecondPageJson);

            const fetchMoreButton = await screen.findByTitle('Fetch more users');
            await user.click(fetchMoreButton);

            const loader = screen.getByTestId('friendsList-fetching_loader');
            expect(loader).toBeInTheDocument();
        });

        it('can fetch more pokes', async () => {
            mock('/api/pokes?page=1', 200, PokesFirstPageJson);

            renderWithDefaultData(<List type="Pokes" />);

            mock('/api/pokes?page=1', 200, PokesFirstPageJson);
            mock('/api/pokes?page=2', 200, PokesSecondPageJson);

            const fetchMoreButton = await screen.findByTitle('Fetch more users');
            await user.click(fetchMoreButton);

            const firstElement = await screen.findByText(PokesFirstPageJson[0].friend.name);
            expect(firstElement).toBeInTheDocument();

            const tenthElement = await screen.findByText(PokesFirstPageJson[9].friend.name);
            expect(tenthElement).toBeInTheDocument();

            const eleventhElement = await screen.findByText(PokesSecondPageJson[0].friend.name);
            expect(eleventhElement).toBeInTheDocument();

            const twentythElement = await screen.findByText(PokesSecondPageJson[9].friend.name);
            expect(twentythElement).toBeInTheDocument();
        });

        it('shows empty component when fetch no pokes', async () => {
            mock('/api/pokes?page=1', 200, []);

            renderWithDefaultData(<List type="Pokes" />);

            const emptyComponent = await screen.findByText('No users, maybe this app is so boring...');
            expect(emptyComponent).toBeInTheDocument();
        });

        it('shows error component when api returns error', async () => {
            mock('/api/pokes?page=1', 500, PokesFirstPageJson);

            renderWithDefaultData(<List type="Pokes" />);

            const errorImage = await screen.findByAltText('Server error');
            expect(errorImage).toBeInTheDocument();

            const emptyComponent = await screen.findByText('Something went wrong');
            expect(emptyComponent).toBeInTheDocument();
        });

        it('shows truthy pokes count', async () => {
            mock('/api/pokes?page=1', 200, PokesFirstPageJson);

            renderWithDefaultData(<List type="Pokes" />);

            for (let i = 0; i < PokesFirstPageJson.length; i++) {
                const element = await screen.findByText(
                    `${PokesFirstPageJson[i].friend.first_name} poked you ${PokesFirstPageJson[i].data.count} times in a row`
                );

                expect(element).toBeInTheDocument();
            }
        });
    });

    describe('Invites list', () => {
        it('fetch button dissapears when page fetched all invites', async () => {
            mock('/api/friends/invites?page=1', 200, InvitesFirstPageJson);

            renderWithDefaultData(<List type="Invites" />);

            mock('/api/friends/invites?page=1', 200, InvitesFirstPageJson);
            mock('/api/friends/invites?page=2', 200, []);

            const fetchMoreButton = await screen.findByTitle('Fetch more users');
            await user.click(fetchMoreButton);

            expect(fetchMoreButton).not.toBeInTheDocument();
        });

        it('shows loaders on initial fetching invites', async () => {
            mock('/api/friends/invites?page=1', 200, InvitesFirstPageJson);

            renderWithDefaultData(<List type="Invites" />);

            const loader = await screen.findByTestId('friendsList-loading_loader');
            expect(loader).toBeInTheDocument();
        });

        it('loads 10 invites', async () => {
            mock('/api/friends/invites?page=1', 200, InvitesFirstPageJson);

            renderWithDefaultData(<List type="Invites" />);

            const firstElement = await screen.findByText(InvitesFirstPageJson[0].friend.name);
            expect(firstElement).toBeInTheDocument();

            const tenthElement = await screen.findByText(InvitesFirstPageJson[9].friend.name);
            expect(tenthElement).toBeInTheDocument();
        });

        it('shows loaders on fetching more invites', async () => {
            mock('/api/friends/invites?page=1', 200, InvitesFirstPageJson);

            renderWithDefaultData(<List type="Invites" />);

            mock('/api/friends/invites?page=1', 200, InvitesFirstPageJson);
            mock('/api/friends/invites?page=2', 200, InvitesSecondPageJson);

            const fetchMoreButton = await screen.findByTitle('Fetch more users');
            await user.click(fetchMoreButton);

            const loader = screen.getByTestId('friendsList-fetching_loader');
            expect(loader).toBeInTheDocument();
        });

        it('can fetch more invites', async () => {
            mock('/api/friends/invites?page=1', 200, InvitesFirstPageJson);

            renderWithDefaultData(<List type="Invites" />);

            mock('/api/friends/invites?page=1', 200, InvitesFirstPageJson);
            mock('/api/friends/invites?page=2', 200, InvitesSecondPageJson);

            const fetchMoreButton = await screen.findByTitle('Fetch more users');
            await user.click(fetchMoreButton);

            const firstElement = await screen.findByText(InvitesFirstPageJson[0].friend.name);
            expect(firstElement).toBeInTheDocument();

            const tenthElement = await screen.findByText(InvitesFirstPageJson[9].friend.name);
            expect(tenthElement).toBeInTheDocument();

            const eleventhElement = await screen.findByText(InvitesSecondPageJson[0].friend.name);
            expect(eleventhElement).toBeInTheDocument();

            const twentythElement = await screen.findByText(InvitesSecondPageJson[9].friend.name);
            expect(twentythElement).toBeInTheDocument();
        });

        it('shows empty component when fetch no invites', async () => {
            mock('/api/friends/invites?page=1', 200, []);

            renderWithDefaultData(<List type="Invites" />);

            const emptyComponent = await screen.findByText('No users, maybe this app is so boring...');
            expect(emptyComponent).toBeInTheDocument();
        });

        it('shows error component when api returns error', async () => {
            mock('/api/friends/invites?page=1', 500);

            renderWithDefaultData(<List type="Invites" />);

            const errorImage = await screen.findByAltText('Server error');
            expect(errorImage).toBeInTheDocument();

            const errorComponent = await screen.findByText('Something went wrong');
            expect(errorComponent).toBeInTheDocument();
        });
    });

    describe('Friends list', () => {
        it('fetch button dissapears when page fetched all friends', async () => {
            mock('/api/friends?page=1', 200, FriendsFirstPageJson);

            renderWithDefaultData(<List type="Friends" />);

            mock('/api/friends?page=1', 200, FriendsFirstPageJson);
            mock('/api/friends?page=2', 200, []);

            const fetchMoreButton = await screen.findByTitle('Fetch more users');
            await user.click(fetchMoreButton);

            expect(fetchMoreButton).not.toBeInTheDocument();
        });

        it('shows loaders on initial fetching friends', async () => {
            mock('/api/friends?page=1', 200, FriendsFirstPageJson);

            renderWithDefaultData(<List type="Friends" />);

            const loader = await screen.findByTestId('friendsList-loading_loader');
            expect(loader).toBeInTheDocument();
        });

        it('loads 10 friends', async () => {
            mock('/api/friends?page=1', 200, FriendsFirstPageJson);

            renderWithDefaultData(<List type="Friends" />);

            const firstElement = await screen.findByText(FriendsFirstPageJson[0].friend.name);
            expect(firstElement).toBeInTheDocument();

            const tenthElement = await screen.findByText(FriendsFirstPageJson[9].friend.name);
            expect(tenthElement).toBeInTheDocument();
        });

        it('shows loaders on fetching more friends', async () => {
            mock('/api/friends?page=1', 200, FriendsFirstPageJson);

            renderWithDefaultData(<List type="Friends" />);

            mock('/api/friends?page=1', 200, FriendsFirstPageJson);
            mock('/api/friends?page=2', 200, FriendsSecondPageJson);

            const fetchMoreButton = await screen.findByTitle('Fetch more users');
            await user.click(fetchMoreButton);

            const loader = screen.getByTestId('friendsList-fetching_loader');
            expect(loader).toBeInTheDocument();
        });

        it('can fetch more friends', async () => {
            mock('/api/friends?page=1', 200, FriendsFirstPageJson);

            renderWithDefaultData(<List type="Friends" />);

            mock('/api/friends?page=1', 200, FriendsFirstPageJson);
            mock('/api/friends?page=2', 200, FriendsSecondPageJson);

            const fetchMoreButton = await screen.findByTitle('Fetch more users');
            await user.click(fetchMoreButton);

            const firstElement = await screen.findByText(FriendsFirstPageJson[0].friend.name);
            expect(firstElement).toBeInTheDocument();

            const tenthElement = await screen.findByText(FriendsFirstPageJson[9].friend.name);
            expect(tenthElement).toBeInTheDocument();

            const eleventhElement = await screen.findByText(FriendsSecondPageJson[0].friend.name);
            expect(eleventhElement).toBeInTheDocument();

            const twentythElement = await screen.findByText(FriendsSecondPageJson[9].friend.name);
            expect(twentythElement).toBeInTheDocument();
        });

        it('shows empty component when fetch no friends', async () => {
            mock('/api/friends?page=1', 200, []);

            renderWithDefaultData(<List type="Friends" />);

            const emptyComponent = await screen.findByText('No users, maybe this app is so boring...');
            expect(emptyComponent).toBeInTheDocument();
        });

        it('shows error component when api returns error', async () => {
            mock('/api/friends?page=1', 500);

            renderWithDefaultData(<List type="Friends" />);

            const errorImage = await screen.findByAltText('Server error');
            expect(errorImage).toBeInTheDocument();

            const emptyComponent = await screen.findByText('Something went wrong');
            expect(emptyComponent).toBeInTheDocument();
        });
    });
});
