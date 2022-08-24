import { screen } from '@testing-library/react';
import { List } from '@components/pages/friends/list/List';
import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import { mock } from '@libs/nock';
import SuggestsFirstPageJson from '@mocks/friendsList/suggests/firstPage.json';
import SuggestsEmptyPageJson from '@mocks/friendsList/suggests/empty.json';
import PokesFirstPageJson from '@mocks/friendsList/pokes/firstPage.json';
import PokesEmptyPageJson from '@mocks/friendsList/pokes/empty.json';
import InvitesFirstPageJson from '@mocks/friendsList/invites/firstPage.json';
import InvitesEmptyPageJson from '@mocks/friendsList/invites/empty.json';
import FriendsFirstPageJson from '@mocks/friendsList/friends/firstPage.json';
import FriendsEmptyPageJson from '@mocks/friendsList/friends/empty.json';

describe('List component', () => {
    describe('Suggests list', () => {
        const users = SuggestsFirstPageJson.data;

        it('render loaders on initial loading', async () => {
            mock({
                path: '/api/suggests?page=1',
                data: SuggestsFirstPageJson,
            });

            renderWithDefaultData(<List path="/api/suggests" type="Suggests" />);

            const loader = await screen.findByTestId('friendsList-loading_loader');

            expect(loader).toBeInTheDocument();
        });

        it('load and render 10 suggests users', async () => {
            mock({
                path: '/api/suggests?page=1',
                data: SuggestsFirstPageJson,
            });

            renderWithDefaultData(<List path="/api/suggests" type="Suggests" />);

            const firstElement = await screen.findByText(users[0].friend.name);
            expect(firstElement).toBeInTheDocument();

            const tenthElement = await screen.findByText(users[9].friend.name);
            expect(tenthElement).toBeInTheDocument();
        });

        it('render empty component when api return empty data', async () => {
            mock({
                path: '/api/suggests?page=1',
                data: SuggestsEmptyPageJson,
            });

            renderWithDefaultData(<List path="/api/suggests" type="Suggests" />);

            const emptyComponent = await screen.findByText('No users, maybe this app is so boring...');
            expect(emptyComponent).toBeInTheDocument();
        });

        it('render error component when api return empty data', async () => {
            mock({
                path: '/api/suggests?page=1',
                status: 500,
            });

            renderWithDefaultData(<List path="/api/suggests" type="Suggests" />);

            const errorImage = await screen.findByAltText('Server error');
            expect(errorImage).toBeInTheDocument();

            const emptyComponent = await screen.findByText('Something went wrong');
            expect(emptyComponent).toBeInTheDocument();
        });
    });

    describe('Pokes list', () => {
        const pokes = PokesFirstPageJson.data;

        it('render loaders on initial loading', async () => {
            mock({
                path: '/api/pokes?page=1',
                data: PokesFirstPageJson,
            });

            renderWithDefaultData(<List path="/api/pokes" type="Pokes" />);

            const loader = await screen.findByTestId('friendsList-loading_loader');

            expect(loader).toBeInTheDocument();
        });

        it('load and render 10 pokes', async () => {
            mock({
                path: '/api/pokes?page=1',
                data: PokesFirstPageJson,
            });

            renderWithDefaultData(<List path="/api/pokes" type="Pokes" />);

            const firstElement = await screen.findByText(pokes[0].friend.name);
            expect(firstElement).toBeInTheDocument();

            const tenthElement = await screen.findByText(pokes[9].friend.name);
            expect(tenthElement).toBeInTheDocument();
        });

        it('render empty component when api return empty data', async () => {
            mock({
                path: '/api/pokes?page=1',
                data: PokesEmptyPageJson,
            });

            renderWithDefaultData(<List path="/api/pokes" type="Pokes" />);

            const emptyComponent = await screen.findByText('No users, maybe this app is so boring...');
            expect(emptyComponent).toBeInTheDocument();
        });

        it('render error component when api return empty data', async () => {
            mock({
                path: '/api/pokes?page=1',
                status: 500,
            });

            renderWithDefaultData(<List path="/api/pokes" type="Pokes" />);

            const errorImage = await screen.findByAltText('Server error');
            expect(errorImage).toBeInTheDocument();

            const emptyComponent = await screen.findByText('Something went wrong');
            expect(emptyComponent).toBeInTheDocument();
        });
    });

    describe('Invites list', () => {
        const users = InvitesFirstPageJson.data;

        it('render loaders on initial loading', async () => {
            mock({
                path: '/api/invites?page=1',
                data: InvitesFirstPageJson,
            });

            renderWithDefaultData(<List path="/api/invites" type="Invites" />);

            const loader = await screen.findByTestId('friendsList-loading_loader');

            expect(loader).toBeInTheDocument();
        });

        it('load and render 10 invites', async () => {
            mock({
                path: '/api/invites?page=1',
                data: InvitesFirstPageJson,
            });

            renderWithDefaultData(<List path="/api/invites" type="Invites" />);

            const firstElement = await screen.findByText(users[0].friend.name);
            expect(firstElement).toBeInTheDocument();

            const tenthElement = await screen.findByText(users[9].friend.name);
            expect(tenthElement).toBeInTheDocument();
        });

        it('render empty component when api return empty data', async () => {
            mock({
                path: '/api/invites?page=1',
                data: InvitesEmptyPageJson,
            });

            renderWithDefaultData(<List path="/api/invites" type="Invites" />);

            const emptyComponent = await screen.findByText('No users, maybe this app is so boring...');
            expect(emptyComponent).toBeInTheDocument();
        });

        it('render error component when api return empty data', async () => {
            mock({
                path: '/api/invites?page=1',
                status: 500,
            });

            renderWithDefaultData(<List path="/api/invites" type="Invites" />);

            const errorImage = await screen.findByAltText('Server error');
            expect(errorImage).toBeInTheDocument();

            const emptyComponent = await screen.findByText('Something went wrong');
            expect(emptyComponent).toBeInTheDocument();
        });
    });

    describe('Friends list', () => {
        const users = FriendsFirstPageJson.data;

        it('render loaders on initial loading', async () => {
            mock({
                path: '/api/friends?page=1',
                data: FriendsFirstPageJson,
            });

            renderWithDefaultData(<List path="/api/friends" type="Friends" />);

            const loader = await screen.findByTestId('friendsList-loading_loader');

            expect(loader).toBeInTheDocument();
        });

        it('load and render 10 friends', async () => {
            mock({
                path: '/api/friends?page=1',
                data: FriendsFirstPageJson,
            });

            renderWithDefaultData(<List path="/api/friends" type="Friends" />);

            const firstElement = await screen.findByText(users[0].friend.name);
            expect(firstElement).toBeInTheDocument();

            const tenthElement = await screen.findByText(users[9].friend.name);
            expect(tenthElement).toBeInTheDocument();
        });

        it('render empty component when api return empty data', async () => {
            mock({
                path: '/api/friends?page=1',
                data: FriendsEmptyPageJson,
            });

            renderWithDefaultData(<List path="/api/friends" type="Friends" />);

            const emptyComponent = await screen.findByText('No users, maybe this app is so boring...');
            expect(emptyComponent).toBeInTheDocument();
        });

        it('render error component when api return empty data', async () => {
            mock({
                path: '/api/friends?page=1',
                status: 500,
            });

            renderWithDefaultData(<List path="/api/friends" type="Friends" />);

            const errorImage = await screen.findByAltText('Server error');
            expect(errorImage).toBeInTheDocument();

            const emptyComponent = await screen.findByText('Something went wrong');
            expect(emptyComponent).toBeInTheDocument();
        });
    });
});
