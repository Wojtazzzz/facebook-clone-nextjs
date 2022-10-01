import { mock } from '@utils/nock';
import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import { List } from './List';
import FriendsFirstPageJson from '@mocks/profile/friends/list/firstPage.json';
import FriendsEmptyPageJson from '@mocks/profile/friends/list/empty.json';
import { screen } from '@testing-library/react';

describe('List component', () => {
    it('render loader when is loading friends', () => {
        mock({
            path: '/api/users/1/friends?search=&page=1',
            data: FriendsFirstPageJson,
        });

        renderWithDefaultData(<List userId={1} query="" />);

        const loaders = screen.getByTestId('friends-loader');

        expect(loaders).toBeInTheDocument();
    });

    it('render error when api return server error', async () => {
        mock({
            path: '/api/users/1/friends?search=&page=1',
            data: FriendsFirstPageJson,
            status: 500,
        });

        renderWithDefaultData(<List userId={1} query="" />);

        const error = await screen.findByTestId('server-error');

        expect(error).toBeInTheDocument();
    });

    it('render empty component when api return empty data', async () => {
        mock({
            path: '/api/users/1/friends?search=&page=1',
            data: FriendsEmptyPageJson,
        });

        renderWithDefaultData(<List userId={1} query="" />);

        const empty = await screen.findByTestId('empty-list');

        expect(empty).toBeInTheDocument();
    });

    it('render 20 friends', async () => {
        mock({
            path: '/api/users/1/friends?search=&page=1',
            data: FriendsFirstPageJson,
        });

        renderWithDefaultData(<List userId={1} query="" />);

        const friends = await screen.findAllByRole('article');

        expect(friends).toHaveLength(20);
    });
});
